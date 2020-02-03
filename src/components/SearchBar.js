import React from 'react';
import axios from 'axios';
import StartWith from './StartWith';
import Result from './Result';
import './SearchBar.css';


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
            inDictionary : null,
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
            <div className="ui container" id="search-bar">
                <StartWith startCharacter={this.state.lastCharacter} firstTime={this.state.firstTime} />
                <div>{this.props.minimalLength - this.state.word.length} characters short</div>
                <form className="ui form" onSubmit={this.onButtonSubmit}>
                    <div className="field">
                        <input type="text" name="word" readOnly={this.state.ended}
                        onChange={this.handleChange}
                        style={{borderColor : (this.state.wasUsed||this.state.wrongStart||this.state.word.length<this.props.minimalLength?'#fc4538':'#38ff84')}}
                        value={this.state.word} />
                    </div>
                    <button className="ui button" type="submit" 
                    disabled={this.state.wasUsed||this.state.wrongStart||this.state.word.length<this.props.minimalLength}>Submit</button>
                </form>
                <Result firstTime={this.state.firstTime} inDictionary={this.state.inDictionary} />
                <div className="clock">{this.state.clock}</div>
            </div>
        );
    }

}

export default SearchBar;