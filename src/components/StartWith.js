import React from 'react';

class StartWith extends React.Component {

    render() {
        if(this.props.firstTime === true) {
            return (null);
        } else {
            return <div>Start with : <span>{this.props.startCharacter}</span></div>
        }
    }
}

export default StartWith;