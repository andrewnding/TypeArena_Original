import React from 'react';
import { connect } from 'react-redux';

import InputBar from './InputBar';
import TextBox from './TextBox';

import { updateInput, fetchTextBoxText } from '../../../actions/arena';

const mapStateToProps = state => ({
    inputText: state.inputText,
    textBoxText: state.textBoxText,
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
        } = this.props;

        return (
            <div className="arena-container">
                <TextBox value={textBoxText} />
                <InputBar value={inputText} onChange={(e) => this.updateInputHandler(e)} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArenaContainer)