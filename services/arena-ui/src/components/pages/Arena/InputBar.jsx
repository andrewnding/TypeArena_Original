import React from 'react';
import classNames from 'classnames';

const InputBar = props => {
    const {
        className,
        value,
        onChange,
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
            />
        </div>
    )
}

export default InputBar;