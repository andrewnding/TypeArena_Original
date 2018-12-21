import React from 'react';

export default class TextBox extends React.Component {
    render() {
        const {
            textBoxText,
        } = this.props;

        return (
            <div>
                {textBoxText}
            </div>
        );
    }
}