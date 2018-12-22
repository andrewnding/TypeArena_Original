import React from 'react';
import { connect } from 'react-redux';

import InputBar from 'components/pages/Arena/InputBar';
import TextBox from 'components/pages/Arena/TextBox';

import { updateInput, fetchTextBoxText } from 'actions/arena';

const mapStateToProps = state => ({
    inputText: state.arena.inputText,
    textBoxText: state.arena.textBoxText,
    currentWordStartIndex: state.arena.currentWordStartIndex,
    currentWordCompleteIndex: state.arena.currentWordCompleteIndex,
    currentIndex: state.arena.currentIndex,
});

const mapDispatchToProps = dispatch => ({
    updateInput: text => { dispatch(updateInput(text)) },
    fetchTextBoxText: () => { dispatch(fetchTextBoxText()) }
});

class ArenaContainer extends React.Component {
    componentDidMount() {
        this.props.fetchTextBoxText();
    }

    updateInputHandler(e) {
        this.props.updateInput(e.target.value);
    }

    render() {
        const {
            inputText,
            textBoxText,
            currentWordStartIndex,
            currentWordCompleteIndex,
            currentIndex
        } = this.props;

        return (
            <div className="arena-container">
                <TextBox
                    currentInput={inputText}
                    value={textBoxText}
                    currentWordStartIndex={currentWordStartIndex}
                    currentWordCompleteIndex={currentWordCompleteIndex}
                    currentIndex={currentIndex}
                />
                <InputBar value={inputText} onChange={(e) => this.updateInputHandler(e)} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArenaContainer)