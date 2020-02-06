import React from 'react';
import axios from 'axios';
import StartWith from './StartWith';
import CharacterShort from './CharacterShort';
import Result from './Result';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './SearchBar.css';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            clock: this.props.timeLimit,
            minimalLength: this.props.minimalLength,
            word : '',
            firstTime : true,
            wasUsed : false,
            wrongStart : false,
            inDictionary : true,
            lastCharacter : undefined,
            used : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.onButtonSubmit = this.onButtonSubmit.bind(this);
    }

    
    componentDidMount(){
        this.timeId = setInterval(
            () => {
                if(this.state.clock > 0){
                    this.setState({clock : this.state.clock - 1});
                } 
            },1000);
    }
    

    handleChange = (event) => {
        let value = event.target.value;
        let firstCharacter = value.charAt(0);
        this.setState({word: value});
        if(!this.state.firstTime) {
            if(this.state.used.includes(value)) {
                this.setState({wasUsed: true});
            } else {
                this.setState({wasUsed: false});
            }
            if(this.state.lastCharacter === firstCharacter){
                this.setState({wrongStart : false});
            } else {
                this.setState({wrongStart: true});
            }
        }   
    }

    onButtonSubmit = (event) => {
        event.preventDefault();
            clearInterval(this.timeId);
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
                            let word = res.data.entries[0].entry;
                            let lastCharacter = word.charAt(word.length - 1);
                            this.setState({inDictionary : true});
                            this.setState({lastCharacter : lastCharacter});
                            this.setState({firstTime : false});
                            this.setState({word : ''});
                            this.setState({clock : this.props.timeLimit});
                            this.setState({used : this.state.used.concat(word)});
                            break;
                        } else {
                            this.setState({inDictionary : false});
                        }
                    }
                    this.timeId = setInterval(
                        () => {
                            if(this.state.clock > 0){
                                this.setState({clock : this.state.clock - 1});
                            } 
                        },
                        1000
                    );
                } else {
                    this.setState({inDictionary : false});
                    
                    this.timeId = setInterval(
                        () => {
                            if(this.state.clock > 0){
                                this.setState({clock : this.state.clock - 1});
                            } 
                        },
                        1000
                    );
                }
            });
    }

    componentDidUpdate(){
        if(this.state.clock === 0){
            this.setState({ended : true});
            this.props.gameEnded(this.state.used.length);
        }
    }

    render(){
        return(
            <div className="search-flex">
                <div className="search-box">
                    <div className="incorrect-word">
                        <StartWith lastCharacter={this.state.lastCharacter} firstTime={this.state.firstTime} 
                        firstCharacter={this.state.word.charAt(0)} className="incorrect-each" />
                        <CharacterShort minimalLength={this.props.minimalLength} wordLength={this.state.word.length} 
                        className="incorrect-each"/>
                        <ProgressBar className="incorrect-each"
                        now={this.state.word.length<=this.props.minimalLength?this.state.word.length/this.props.minimalLength*100:100} />
                        <div className="incorrect-each" style={{color: '#FF1493'}}>{this.state.wasUsed?"Already used once":null}</div>
                    </div>
                    <form className="ui form" onSubmit={this.onButtonSubmit}>
                        <div className="field">
                            <input type="text" name="word" readOnly={this.state.ended}
                            onChange={this.handleChange}
                            style={{borderColor : (this.state.wasUsed||this.state.wrongStart||this.state.word.length<this.props.minimalLength?'#FF1493':'#0ee3eb')}}
                            value={this.state.word} />
                        </div>
                        <button className="ui button" type="submit" id="search-button"
                        disabled={this.state.wasUsed||this.state.wrongStart||this.state.word.length<this.props.minimalLength}>Submit</button>
                    </form>
                    <Result firstTime={this.state.firstTime} inDictionary={this.state.inDictionary} />
                    <CircularProgressbar
                        value={(this.props.timeLimit-this.state.clock)/this.props.timeLimit*100}
                        text={this.state.clock}
                        className="circle"
                        styles={buildStyles({
                            textColor: "#000",
                            pathColor: "rgb(255, 20, 145)"
                          })}
                    />
                </div>
            </div>
            
        );
    }

}

export default SearchBar;