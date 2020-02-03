import React from 'react';

class GameReport extends React.Component {

    render() {
        return(
            <div>
                <div>Time is up!</div>
                <div>You got {this.props.count} words!</div>
            </div>
        )
    }
}

export default GameReport;