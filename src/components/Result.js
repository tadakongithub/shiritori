import React from 'react';

class Result extends React.Component {

    render(){
        if(this.props.firstTime) {
            return (null);
        } else {
            if(this.props.inDictionary){
                return(
                    <div>Yes, the word was in our dictonary.</div>
                );
            } else {
                return(
                    <div>No, we couldn't find the word in our dictionary.</div>
                );
            }
        }
    }
}

export default Result;