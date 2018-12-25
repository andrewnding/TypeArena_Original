import React from 'react';
import classNames from 'classnames';

export default class InputBar extends React.Component {
    render() {
        const {
            className,
            value,
            onChange,
        } = this.props;
        
        return (
            <div>
                <input
                    className={classNames(
                        'input',
                        className
                    )}
                    value={value}
                    onChange={(e) => onChange(e)}
                />
            </div>
        );
    }
}