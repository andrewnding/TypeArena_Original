import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import InputBar from 'components/pages/Arena/InputBar';
import TextBox from 'components/pages/Arena/TextBox';
import Timer from 'components/pages/Arena/Timer';

import { updateInput, fetchTextBoxText, startTimer, stopTimer } from 'actions/arena';
import { updateInputSocket } from 'utils/socket';

const mapStateToProps = state => ({
    inputText: state.arena.inputText,
    textBoxText: state.arena.textBoxText,
    currentWordStartIndex: state.arena.currentWordStartIndex,
    currentIndex: state.arena.currentIndex,
    status: state.arena.status,
    timerId: state.arena.timerId,
    timerTime: state.arena.timerTime,
});

const mapDispatchToProps = dispatch => ({
    updateInput: text => { dispatch(updateInput(text)) },
    fetchTextBoxText: () => { dispatch(fetchTextBoxText()) },
    startTimer: () => { dispatch(startTimer()) },
    stopTimer: timerId => { dispatch(stopTimer(timerId)) },
});

const ArenaContainer = props => {
    const {
        inputText,
        textBoxText,
        currentWordStartIndex,
        currentIndex,
        status,
        timerId,
        timerTime,
        fetchTextBoxText,
        updateInput,
        startTimer,
        stopTimer,
    } = props;

    useEffect(() => {
        fetchTextBoxText();

        return () => {
            if (timerId !== null)  {
                stopTimer(timerId);
            }
        }
    }, []);

    useEffect(() => {
        if (status === 'RUNNING') {
            startTimer()
        }
        if (status === 'DONE') {
            stopTimer(timerId)
        }
    }, [status])

    const updateInputHandler = e => {
        updateInput(e.target.value);
        updateInputSocket(e.target.value)
    }

    return (
        <div className="arena-container">
            <Timer
                className={classNames(
                    'timer--arena',
                    { 'timer--arena__success': status === 'RUNNING' }
                )}
                seconds={timerTime}
            />
            <TextBox
                currentInput={inputText}
                value={textBoxText}
                currentWordStartIndex={currentWordStartIndex}
                currentIndex={currentIndex}
            />
            <InputBar
                className={classNames(
                    'input--arena',
                    { 'input--arena__danger': inputText.length !== (currentIndex - currentWordStartIndex) }
                )}
                value={inputText}
                onChange={(e) => updateInputHandler(e)}
                disabled={status === 'DONE'}
            />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ArenaContainer)