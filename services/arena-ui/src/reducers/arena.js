import { ARENA_UPDATE_INPUT, SUCCESS_TEXT_BOX_TEXT } from 'actions/arena';

export const INITIAL_VALUES = {
    inputText: '',
    textBoxText: '',
}

export default (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case ARENA_UPDATE_INPUT:
            return {
                ...state,
                inputText: action.payload
            }
        case SUCCESS_TEXT_BOX_TEXT:
            return {
                ...state,
                textBoxText: action.payload
            }
        default:
            return state
    }
}