import React from 'react';

class Result extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        if(this.props.inDictionary){
            return(
                <div>Yes, the word was in our dictonary.</div>
            );
        } else if (this.props.inDictionary === false) {
            return(
                <div>No, we couldn't find the word in our dictionary.</div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default Result;