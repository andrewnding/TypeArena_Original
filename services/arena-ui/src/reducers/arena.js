import { ARENA_UPDATE_INPUT, SUCCESS_TEXT_BOX_TEXT, TIMER_START, TIMER_TICK, TIMER_STOP } from 'actions/arena';
import { getWordStartingAtIndex } from 'utils/stringHelpers';
import { completeWord } from 'utils/socket';

export const INITIAL_VALUES = {
    inputText: '',
    textBoxText: '',
    currentWordStartIndex: 0,
    currentIndex: 0,
    status: 'WAITING',
    timerId: null,
    timerTime: 0,
}

export default (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case ARENA_UPDATE_INPUT:
            let inputText = action.payload;
            const currentWord = getWordStartingAtIndex(state.textBoxText, state.currentWordStartIndex);
            const lastLetter = inputText[inputText.length - 1];

            // Limit the number of characters that can be typed to the length of the current word plus 10.
            if (inputText.length > currentWord.length + 10) {
                inputText = inputText.slice(0, currentWord.length + 10);
            }

            // Check if the current word is correct and we are on the last word
            if (inputText === currentWord && state.textBoxText.indexOf(' ', state.currentWordStartIndex) === -1) {
                completeWord(currentWord);
                return {
                    ...state,
                    inputText,
                    currentIndex: state.currentIndex + 1,
                    status: 'DONE',
                }
            }

            // If last letter was space and the input words matches the current word, move on to next word
            if (lastLetter === ' ' && inputText === currentWord + ' ') {
                completeWord(currentWord);
                return {
                    ...state,
                    inputText: '',
                    currentWordStartIndex: state.currentIndex + 1,
                    currentIndex: state.currentIndex + 1,
                    status: 'RUNNING',
                }
            }

            // On every letter change, check if input matches expected word
            const diffIndex = indexOfDifference(inputText, currentWord);

            // If input doesn't match current word so far
            if (diffIndex !== inputText.length) {
                return {
                    ...state,
                    inputText,
                    status: 'RUNNING',
                }
            }

            return {
                ...state,
                inputText,
                currentIndex: state.currentWordStartIndex + diffIndex,
                status: 'RUNNING',
            }
        case SUCCESS_TEXT_BOX_TEXT:
            return {
                ...state,
                textBoxText: action.payload,
            }
        case TIMER_START:
            return {
                ...state,
                timerId: action.payload,
                timerTime: 0,
            }
        case TIMER_TICK:
            return {
                ...state,
                timerTime: state.timerTime + 1,
            }
        case TIMER_STOP:
            return {
                ...state,
                timerId: null,
            }
        default:
            return state
    }
}



export const indexOfDifference = (s1, s2) => {
    for (let i = 0; i < s1.length; i++) {
        if (i >= s2.length) {
            return i;
        }

        if (s1[i] !== s2[i]) {
            return i
        }
    }

    return s1.length;
}