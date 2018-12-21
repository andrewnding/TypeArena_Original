export const ARENA_UPDATE_INPUT = 'ARENA_UPDATE_INPUT';

export const FETCHING_TEXT_BOX_TEXT = 'FETCHING_TEXT_BOX_TEXT';
export const SUCCESS_TEXT_BOX_TEXT = 'SUCCESS_TEXT_BOX_TEXT';
export const ERROR_TEXT_BOX_TEXT = 'ERROR_TEXT_BOX_TEXT';

export const updateInput = text => ({
    type: ARENA_UPDATE_INPUT,
    payload: text
});

export const fetchingTextBoxText = () => ({
    type: FETCHING_TEXT_BOX_TEXT
})

export const successTextBoxText = text => ({
    type: SUCCESS_TEXT_BOX_TEXT,
    payload: text
})

export const errorTextBoxText = (e) => ({
    type: ERROR_TEXT_BOX_TEXT,
    payload: e
})

export const fetchTextBoxText = () => {
    return dispatch => {
        dispatch(fetchingTextBoxText());
        return fetch('/get_arena_text')
            .then(response => {console.log(response); return dispatch(successTextBoxText(response))})
            .catch(e => dispatch(errorTextBoxText(e)));
    }
}