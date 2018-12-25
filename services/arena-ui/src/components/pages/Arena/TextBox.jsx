import React from 'react';

import { getWordStartingAtIndex } from 'utils/stringHelpers';

export default class TextBox extends React.Component {
    getCompletedText() {
        const {
            value,
            currentWordStartIndex,
        } = this.props;

        return value.slice(0, currentWordStartIndex);
    }

    getCurrentWord() {
        const {
            value,
            currentWordStartIndex,
            currentIndex,
        } = this.props;

        return (
            <span className="textbox--current-word">
                <span className="textbox--completed">
                    {value.slice(currentWordStartIndex, currentIndex)}
                </span>
                <span>
                    {getWordStartingAtIndex(value, currentIndex)}
                </span>
            </span>
        )
    }

    getRemainingText() {
        const {
            value,
            currentWordStartIndex,
        } = this.props;
        const spaceIndex = value.indexOf(' ', currentWordStartIndex);

        if (spaceIndex === -1) {
            return '';
        }

        return value.slice(value.indexOf(' ', currentWordStartIndex));
    }

    renderText() {
        return (
            <div>
                <span className="textbox--completed">{this.getCompletedText()}</span>
                <span className="textbox--current-word">{this.getCurrentWord()}</span>
                {this.getRemainingText()}
            </div>
        )
    }

    render() {
        return (
            <div className="textbox">
                {this.renderText()}
            </div>
        );
    }
}