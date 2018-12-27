export const ARENA_UPDATE_INPUT = 'ARENA_UPDATE_INPUT';

export const TIMER_START = 'TIMER_START';
export const TIMER_TICK = 'TIMER_TICK';
export const TIMER_STOP = 'TIMER_STOP';

export const FETCHING_TEXT_BOX_TEXT = 'FETCHING_TEXT_BOX_TEXT';
export const SUCCESS_TEXT_BOX_TEXT = 'SUCCESS_TEXT_BOX_TEXT';
export const ERROR_TEXT_BOX_TEXT = 'ERROR_TEXT_BOX_TEXT';

export const updateInput = text => ({
    type: ARENA_UPDATE_INPUT,
    payload: text
});

export const startTimer = () => {
    return dispatch => {
        const timerId = setInterval(() => dispatch({ type: TIMER_TICK }), 1000);
        dispatch({
            type: TIMER_START,
            payload: timerId
        });
    }
}

export const stopTimer = timerId => {
    return dispatch => {
        clearInterval(timerId);
        dispatch({ type: TIMER_STOP });
    }
}

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
        return fetch('/api/get_arena_text')
            .then(response => response.json())
            .then(response => dispatch(successTextBoxText(response.text)))
            .catch(e => dispatch(errorTextBoxText(e)));
    }
}