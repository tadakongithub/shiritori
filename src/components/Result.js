import React from 'react';

class Result extends React.Component {

    render(){
            if(!this.props.inDictionary){
                return(
                    <div style={{color: '#FF1493', textAlign: 'center'}}>It's NOT a word!</div>
                );
            } else {
                return (null);
            }
    }
}

export default Result;