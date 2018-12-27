import React from 'react';
import classNames from 'classnames';

const InputBar = props => {
    const {
        className,
        value,
        onChange,
        disabled,
    } = props;
    
    return (
        <div>
            <input
                className={classNames(
                    'input',
                    className
                )}
                value={value}
                onChange={(e) => onChange(e)}
                disabled={disabled}
            />
        </div>
    )
}

export default InputBar;