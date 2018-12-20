import React from 'react';

export default class Arena extends React.Component {
    constructor() {
        super();

        this.state = {
            currText: ''
        }
    }

    handleKeyPress(e) {
        this.setState({ currText: e.target.value });
    }

    render() {
        return (
            <div className="page-arena">
                Arena
                <div>
                    
                </div>
                <div className="test">
                    <input value={this.state.currText} onChange={(e) => this.handleKeyPress(e)} />
                </div>
            </div>
        )
    }
}