import arenaReducer, { INITIAL_VALUES, indexOfDifference } from 'reducers/arena';
import { ARENA_UPDATE_INPUT, SUCCESS_TEXT_BOX_TEXT } from 'actions/arena';

describe('arena reducer', () => {
    it('returns the initial values by default', () => {
        const testAction = { type: '' }
        const val = arenaReducer(undefined, testAction);
        
        expect(val).toEqual(INITIAL_VALUES)
    });

    describe('ARENA_UPDATE_INPUT', () => {
        it('handles adding a correct character', () => {
            const testState = {
                inputText: 'ma',
                textBoxText: 'What a magnificient view!',
                currentWordStartIndex: 7,
                currentIndex: 9,
            }
            const testAction = {
                type: ARENA_UPDATE_INPUT,
                payload: 'mag'
            }
            const val = arenaReducer(testState, testAction);

            expect(val).toEqual({
                ...testState,
                inputText: 'mag',
                currentIndex: 10
            })
        });

        it('handles adding an incorrect character', () => {
            const testState = {
                inputText: 'ma',
                textBoxText: 'What a magnificient view!',
                currentWordStartIndex: 7,
                currentIndex: 9,
            }
            const testAction = {
                type: ARENA_UPDATE_INPUT,
                payload: 'maf'
            }
            const val = arenaReducer(testState, testAction);

            expect(val).toEqual({
                ...testState,
                inputText: 'maf',
            })
        });

        it('handles hitting space when input matches word', () => {
            const testState = {
                inputText: 'magnificient',
                textBoxText: 'What a magnificient view!',
                currentWordStartIndex: 7,
                currentIndex: 19,
            }
            const testAction = {
                type: ARENA_UPDATE_INPUT,
                payload: 'magnificient '
            }
            const val = arenaReducer(testState, testAction);

            expect(val).toEqual({
                ...testState,
                inputText: '',
                currentWordStartIndex: 20,
                currentIndex: 20,
            })
        });

        it('handles hitting space when input does not match word', () => {
            const testState = {
                inputText: 'magnificienr',
                textBoxText: 'What a magnificient view!',
                currentWordStartIndex: 7,
                currentIndex: 18, // currentIndex is 18 because it would have stopped at 18 due to magnificienr !== magnificient
            }
            const testAction = {
                type: ARENA_UPDATE_INPUT,
                payload: 'magnificienr '
            }
            const val = arenaReducer(testState, testAction);

            expect(val).toEqual({
                ...testState,
                inputText: 'magnificienr ',
            })
        });

        it('handles deleting a character', () => {
            const testState = {
                inputText: 'ma',
                textBoxText: 'What a magnificient view!',
                currentWordStartIndex: 7,
                currentIndex: 9,
            }
            const testAction = {
                type: ARENA_UPDATE_INPUT,
                payload: 'm'
            }
            const val = arenaReducer(testState, testAction);

            expect(val).toEqual({
                ...testState,
                inputText: 'm',
                currentIndex: 8
            })
        });

        it('handles deleting multiple characters', () => {
            const testState = {
                inputText: 'ma',
                textBoxText: 'What a magnificient view!',
                currentWordStartIndex: 7,
                currentIndex: 9,
            }
            const testAction = {
                type: ARENA_UPDATE_INPUT,
                payload: ''
            }
            const val = arenaReducer(testState, testAction);

            expect(val).toEqual({
                ...testState,
                inputText: '',
                currentIndex: 7
            })
        });

        it('limits how many incorrect characters you can type', () => {
            // Currently limits the number of incorrect characters to currentWord length + 10
            const testState = {
                inputText: 'ABCDEFGH',
                textBoxText: 'What a magnificient view!',
                currentWordStartIndex: 0,
                currentIndex: 0,
            }
            const testAction = {
                type: ARENA_UPDATE_INPUT,
                payload: 'ABCDEFGHIJKLMNOP'
            }
            const val = arenaReducer(testState, testAction);

            expect(val).toEqual({
                ...testState,
                inputText: 'ABCDEFGHIJKLMN',
            });
        });

        it('handles typing the last character correctly', () => {
            const testState = {
                inputText: 'view',
                textBoxText: 'What a magnificient view!',
                currentWordStartIndex: 20,
                currentIndex: 24,
            }
            const testAction = {
                type: ARENA_UPDATE_INPUT,
                payload: 'view!'
            }
            const val = arenaReducer(testState, testAction);

            expect(val).toEqual({
                ...testState,
                inputText: 'view!',
            })
        });

        it('handles typing the last character incorrectly', () => {
            const testState = {
                inputText: 'view',
                textBoxText: 'What a magnificient view!',
                currentWordStartIndex: 20,
                currentIndex: 24,
            }
            const testAction = {
                type: ARENA_UPDATE_INPUT,
                payload: 'view.'
            }
            const val = arenaReducer(testState, testAction);

            expect(val).toEqual({
                ...testState,
                inputText: 'view.',
            })
        });
    });

    describe('helpers', () => {
        it('indexOfDifference', () => {
            expect(indexOfDifference('hello', 'heilo')).toEqual(2)
            expect(indexOfDifference('heilo', 'hello')).toEqual(2)
            expect(indexOfDifference('hello', 'hello')).toEqual(5)
            expect(indexOfDifference('hello', 'helloooo')).toEqual(5)
            expect(indexOfDifference('helloooo', 'hello')).toEqual(5)
            expect(indexOfDifference('', 'hello')).toBe(0)
            expect(indexOfDifference('hello', '')).toBe(0)
            expect(indexOfDifference('', '')).toBe(0)
        });
    });
});