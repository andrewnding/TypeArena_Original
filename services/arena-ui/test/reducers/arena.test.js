import arenaReducer, { INITIAL_VALUES, indexOfDifference } from 'reducers/arena';

describe('arena reducer', () => {
    it('returns the initial values by default', () => {
        const testAction = { type: '' }
        const val = arenaReducer(undefined, testAction);
        
        expect(val).toEqual(INITIAL_VALUES)
    });

    describe('ARENA_UPDATE_INPUT', () => {
        it('handles adding a correct character', () => {

        });

        it('handles adding an incorrect character', () => {
            
        });

        it('handles hitting space when input matches word', () => {

        });

        it('handles hitting space when input does not match word', () => {
            
        });

        it('handles deleting a character', () => {
            
        });

        it('handles deleting multiple characters', () => {
            
        });
    });

    describe('helpers', () => {
        it('indexOfDifference', () => {
            expect(indexOfDifference('hello', 'heilo')).toEqual(2)
            expect(indexOfDifference('heilo', 'hello')).toEqual(2)
            expect(indexOfDifference('hello', 'hello')).toEqual(5)
            expect(indexOfDifference('hello', 'helloooo')).toEqual(5)
            expect(indexOfDifference('helloooo', 'hello')).toEqual(5)
            expect(indexOfDifference('', 'hello')).toBe(null)
            expect(indexOfDifference('hello', '')).toBe(null)
            expect(indexOfDifference('', '')).toBe(null)
        });
    });
});