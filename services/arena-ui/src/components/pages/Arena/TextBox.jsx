import React from 'react';

import { getWordStartingAtIndex } from 'utils/stringHelpers';

const TextBox = props => {
    const getCompletedText = () => {
        const {
            value,
            currentWordStartIndex,
        } = props;

        return value.slice(0, currentWordStartIndex);
    }

    const getCurrentWord = () => {
        const {
            value,
            currentWordStartIndex,
            currentIndex,
        } = props;

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

    const getRemainingText = () => {
        const {
            value,
            currentWordStartIndex,
        } = props;
        const spaceIndex = value.indexOf(' ', currentWordStartIndex);

        if (spaceIndex === -1) {
            return '';
        }

        return value.slice(value.indexOf(' ', currentWordStartIndex));
    }

    const renderText = () => {
        return (
            <div>
                <span className="textbox--completed">{getCompletedText()}</span>
                <span className="textbox--current-word">{getCurrentWord()}</span>
                {getRemainingText()}
            </div>
        )
    }

    
    return (
        <div className="textbox">
            {renderText()}
        </div>
    );
}

export default TextBox;