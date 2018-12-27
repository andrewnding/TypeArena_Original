import React from 'react';
import classNames from 'classnames';

const Timer = props => {
    const {
        className,
        seconds
    } = props;

    const convertTime = seconds => {
        const date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(14, 5);
    }

    return (
        <div
            className={classNames(
            'timer',
            className
        )}>
            {convertTime(seconds)}
        </div>
    )
}

export default Timer;