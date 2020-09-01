import React from 'react';
import './Rule.css';


class Rule extends React.Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {timeLimit: '5', minimalLength: '3'};
    }

    onFormSubmit (e) {
        e.preventDefault();
        this.props.onButtonClick(this.state.timeLimit, this.state.minimalLength);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <div className="rule-flex">
                <div className="rule-box">
                    <h3>Rule</h3>
                    <div>You have to type a word that starts with the last character of the previous word.</div>
                    <h3>Difficulty</h3>
                    <form id="settingGame" className="ui form" onSubmit={this.onFormSubmit}>
                        <div className="field">
                            <label>Time limit in seconds</label>
                            <select className="ui dropdown"  name="timeLimit" value={this.state.timeLimit} onChange={this.handleChange} required>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>    
                        </div> 
                            
                        <div className="field">
                            <label>Minimal length of the word (How many characters)</label>
                            <select className="ui dropdown" name="minimalLength" value={this.state.minimalLength} onChange={this.handleChange} required>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <button type="submit" form="settingGame" className="ui pink button" id="start-button">Start</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}

export default Rule;