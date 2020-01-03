import React from 'react';
import axios from 'axios';
import Result from './Result';
import CurrentPlayer from './CurrentPlayer';

class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {word : '', inDictionary : null, lastCharacter : '', rightWord : true, firstTime : true, currentPlayer : 1};
        this.handleChange = this.handleChange.bind(this);
        this.onButtonSubmit = this.onButtonSubmit.bind(this);
    }

    handleChange = (event) => {
        let value = event.target.value;
        let firstCharacter = value.charAt(0);
        if(this.state.firstTime){
            this.setState({word : value});
        } else {
            if(firstCharacter === this.state.lastCharacter){
                this.setState({word : value});
                this.setState({rightWord : true});
                this.setState({inDictionary : null});
            } else {
                this.setState({word : value});
                this.setState({rightWord : false});
                this.setState({inDictionary : null});
            }
        }
    }

    onButtonSubmit = (event) => {
        event.preventDefault();
        if(this.state.rightWord){
            axios.get("https://lingua-robot.p.rapidapi.com/language/v1/entries/en/"+this.state.word, 
            {headers : 
                {
                    "x-rapidapi-host": "lingua-robot.p.rapidapi.com",
                    "x-rapidapi-key": "f8c206af06mshb3edd74d202913bp19fd40jsn69e13e3e8069"
                }
            })
            .then(res => {
                if(res.data.entries.length > 0){
                    if(res.data.entries[0].entry === res.data.entries[0].lexemes[0].lemma){
                        this.setState({inDictionary : true});
                        let word = res.data.entries[0].entry;
                        let lastCharacter = word.charAt(word.length - 1);
                        this.setState({lastCharacter : lastCharacter});
                        this.setState({firstTime : false});
                        this.setState({word : ''});
                        this.setState({currentPlayer : this.state.currentPlayer === 1 ? 2 : 1});
                        console.log(res.data);
                    }
                } else {
                    this.setState({inDictionary : false});
                }
            });
        }
    }


    render(){
        return(
            <div className="ui container">
                <form className="ui form" onSubmit={this.onButtonSubmit}>
                    <div className="field">
                        <input type="text" name="word" placeholder="Type in a word here" 
                        onChange={this.handleChange} style={{border : '1px solid ' + (this.state.rightWord?'green':'red')}} value={this.state.word} />
                    </div>
                    <button className="ui button" type="submit" disabled={!this.state.rightWord}>Submit</button>
                </form>
                <Result inDictionary={this.state.inDictionary} lastCharacter={this.state.lastCharacter} />
                <CurrentPlayer currentPlayer={this.state.currentPlayer} />
            </div>
        );
    }

}


export default SearchBar;