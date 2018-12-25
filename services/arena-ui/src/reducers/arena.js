import { ARENA_UPDATE_INPUT, SUCCESS_TEXT_BOX_TEXT } from 'actions/arena';
import { getWordStartingAtIndex } from 'utils/stringHelpers';

export const INITIAL_VALUES = {
    inputText: '',
    textBoxText: '',
    currentWordStartIndex: 0,
    currentIndex: 0,
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
                console.log('done')
                return {
                    ...state,
                    inputText,
                }
            }

            // If last letter was space and the input words matches the current word, move on to next word
            if (lastLetter === ' ' && inputText === currentWord + ' ') {
                return {
                    ...state,
                    inputText: '',
                    currentWordStartIndex: state.currentIndex + 1,
                    currentIndex: state.currentIndex + 1,                    
                }
            }

            // On every letter change, check if input matches expected word
            const diffIndex = indexOfDifference(inputText, currentWord);

            // If input doesn't match current word so far
            if (diffIndex !== inputText.length) {
                return {
                    ...state,
                    inputText,
                }
            }

            return {
                ...state,
                inputText,
                currentIndex: state.currentWordStartIndex + diffIndex,
            }
        case SUCCESS_TEXT_BOX_TEXT:
            return {
                ...state,
                textBoxText: action.payload,
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