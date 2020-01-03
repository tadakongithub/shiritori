import React from 'react';

class CurrentPlayer extends React.Component{
    render(){
        return(
            <div>Player : {this.props.currentPlayer} </div>
        );
    }
}

export default CurrentPlayer;