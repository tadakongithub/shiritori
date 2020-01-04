import React from 'react';
import axios from 'axios';
import Result from './Result';
import './SearchBar.css';


class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {word : '', inDictionary : null, lastCharacter : undefined, firstTime : true, currentPlayer : 1, winner : undefined, clock: 10,
                        used : [], wasUsed : false, ended : false, wrongStart : false};
        this.handleChange = this.handleChange.bind(this);
        this.onButtonSubmit = this.onButtonSubmit.bind(this);
    }

    componentDidMount(){
        setInterval(
            () => {
                if(this.state.clock > 0){
                    this.timeId = this.setState({clock : this.state.clock - 1});
                } 
            },1000);
    }

    handleChange = (event) => {
        let value = event.target.value;
        if(this.state.firstTime){
            this.setState({word : value});
        } else {
            for(let j = 0 ; j < this.state.used.length ; j++){
                if(this.state.used[j] === value){
                    this.setState({wasUsed : true});
                    this.setState({word: value});
                    break;
                } else {
                    this.setState({wasUsed :false});
                    this.setState({word: value});
                }
            }
            if(!this.state.wasUsed){
                let firstCharacter = value.charAt(0);
                if(this.state.lastCharacter === firstCharacter){
                    this.setState({word : value});
                    this.setState({wrongStart : false});
                } else {
                    this.setState({word : value});
                    this.setState({wrongStart: true});
                }
            }
        }
    }

    onButtonSubmit = (event) => {
        event.preventDefault();
        if(!this.state.wasUsed){
            axios.get("https://lingua-robot.p.rapidapi.com/language/v1/entries/en/"+this.state.word, 
            {headers : 
                {
                    "x-rapidapi-host": "lingua-robot.p.rapidapi.com",
                    "x-rapidapi-key": "f8c206af06mshb3edd74d202913bp19fd40jsn69e13e3e8069"
                }
            })
            .then(res => {
                if(res.data.entries.length > 0){
                    for(let i = 0 ; i < res.data.entries[0].lexemes.length ; i++){
                        if(res.data.entries[0].lexemes[i].lemma === res.data.entries[0].entry){
                            this.setState({inDictionary : true});
                            let word = res.data.entries[0].entry;
                            let lastCharacter = word.charAt(word.length - 1);
                            this.setState({lastCharacter : lastCharacter});
                            this.setState({firstTime : false});
                            this.setState({word : ''});
                            this.setState({currentPlayer : this.state.currentPlayer === 1 ? 2 : 1});
                            this.setState({clock : 10});
                            this.setState({used : this.state.used.concat(word)});
                            console.log(this.state.used);
                            break;
                        } else {
                            this.setState({inDictionary : false});
                        }
                    }
                    console.log(res.data);
                } else {
                    this.setState({inDictionary : false});
                }
            });
        }
    }

    componentDidUpdate(){
        if(this.state.clock === 0){
            this.setState({winner : this.state.currentPlayer===1?2:1});
            this.setState({clock : undefined});
            this.setState({currentPlayer : undefined});
            this.setState({inDictionary : undefined});
            this.setState({wasUsed : true});
            this.setState({word : ''});
            this.setState({ended : true});
        }
    }

    render(){
        return(
            <div className="ui container">
                <div>{!this.state.firstTime?"Start with ":""}<span className="start">{!this.state.firstTime?this.state.lastCharacter:""}</span></div>
                <form className="ui form" onSubmit={this.onButtonSubmit}>
                    <div className="field">
                        <input type="text" name="word" placeholder={this.state.ended?'Refresh to start again!':'Type in a word here'} readOnly={this.state.ended}
                        onChange={this.handleChange} style={{border : '1px solid ' + (this.state.wasUsed||this.state.wrongStart?'red':'green')}} value={this.state.word} />
                    </div>
                    <button className="ui button" type="submit" disabled={this.state.wasUsed||this.state.wrongStart}>Submit</button>
                </form>
                <Result inDictionary={this.state.inDictionary} lastCharacter={this.state.lastCharacter} />
                <div className={"current "+(this.state.ended?"none":"")}>Player : {this.state.currentPlayer}</div>
                <div className={"winner "+(this.state.ended?"block":"")}>Winner : Player {this.state.winner}</div>
                <div className="clock">{this.state.clock}</div>
            </div>
        );
    }

}

export default SearchBar;