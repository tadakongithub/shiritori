import React from 'react';
import SearchBar from './SearchBar';
import GameReport from './GameReport';
import './App.css';
import Rule from './Rule';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.gameEnded = this.gameEnded.bind(this);
        this.state = {started: false, ended: false, count: 0, timeLimit: '', minimalLength: ''};
    }

    onButtonClick (timeLimit, minimalLength) {
        this.setState({started : true});
        this.setState({timeLimit: timeLimit});
        this.setState({minimalLength: minimalLength});
    }

    gameEnded(count) {
        this.setState({ended: true});
        this.setState({count: count});
    }

    render() {

        if(this.state.started) {
            if(this.state.ended) {
                return <GameReport count={this.state.count}/>
            } else {
                return (
                    <SearchBar gameEnded={this.gameEnded} 
                    timeLimit={this.state.timeLimit} minimalLength={this.state.minimalLength} />
                )
            }
        } else {
            return <Rule onButtonClick={this.onButtonClick} />
        }

    }
    
}

export default App;