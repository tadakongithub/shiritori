import React from 'react';

class Rule extends React.Component{
    render(){
        return(
            <ul>
                <li>Your word has to start with the last character of the last word.</li>
                <li>You have to answer in 10 seconds.</li>
                <li>You can't use any word that has been already used.</li>
                <li>The first word can be anything.</li>
            </ul>
        )
    }
}

export default Rule;