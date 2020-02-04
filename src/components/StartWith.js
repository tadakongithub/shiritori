import React from 'react';

class StartWith extends React.Component {

    render() {
        if(this.props.firstTime === true) {
            return (null);
        } else {
            return <div>Start with &nbsp;     
                <span style={{
                    fontSize: '30px',
                    color: (this.props.firstCharacter===this.props.lastCharacter?"green":"#f0ad4e")}}>{this.props.lastCharacter}</span>
                </div>
        }
    }
}

export default StartWith;