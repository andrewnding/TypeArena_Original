import { indexOfDifference } from 'reducers/arena';

describe('helpers', () => {
    it('indexOfDifference', () => {
        expect(indexOfDifference('hello', 'heilo')).toEqual(2)
    })
})