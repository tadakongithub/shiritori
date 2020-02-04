import React from 'react';
import './Rule.css';

class Rule extends React.Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {timeLimit: '', minimalLength: ''};
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
                            <label>Time Limit:</label>
                            <input name="timeLimit" value={this.state.timeLimit} type="text" onChange={this.handleChange} required/>
                        </div>
                        <div className="field">
                            <label>Minimal Length:</label>
                            <input name="minimalLength" value={this.state.minimalLength} type="text" onChange={this.handleChange} required/>
                        </div>
                        <button type="submit" form="settingGame" className="ui pink button" id="start-button">Start</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}

export default Rule;