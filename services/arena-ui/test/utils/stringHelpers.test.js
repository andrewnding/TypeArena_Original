import { getWordStartingAtIndex } from 'utils/stringHelpers';

describe('stringHelpers', () => {
    it('getWordStartingAtIndex', () => {
        const testPhrase = 'This is a fantastic test!'

        expect(getWordStartingAtIndex(testPhrase, 0)).toEqual('This');
        expect(getWordStartingAtIndex(testPhrase, 5)).toEqual('is');
        expect(getWordStartingAtIndex(testPhrase, 8)).toEqual('a');
        expect(getWordStartingAtIndex(testPhrase, 20)).toEqual('test!');
        expect(getWordStartingAtIndex(testPhrase, 1)).toEqual('his');
    });
});