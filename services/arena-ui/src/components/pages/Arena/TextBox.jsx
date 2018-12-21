import React from 'react';

export default class TextBox extends React.Component {
    render() {
        const {
            value,
        } = this.props;

        return (
            <div className="textbox">
                {value}
            </div>
        );
    }
}