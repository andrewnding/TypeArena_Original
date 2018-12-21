import { ARENA_UPDATE_INPUT, SUCCESS_TEXT_BOX_TEXT } from '../actions/arena';

export const INITIAL_VALUES = {
    inputText: '',
    fetchTextBoxText: '',
}

export default (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case ARENA_UPDATE_INPUT:
            return {
                inputText: action.payload
            }
        case SUCCESS_TEXT_BOX_TEXT:
            console.log(action)
            return {
                fetchTextBoxText: action.payload
            }
        default:
            return state
    }
}