import React from 'react';

export default class InputBar extends React.Component {
    render() {
        const {
            value,
            onChange,
        } = this.props;
        
        return (
            <div>
                <input
                    className="input input--arena"
                    value={value}
                    onChange={(e) => onChange(e)}
                />
            </div>
        );
    }
}