import React from 'react';
import './GameReport.css';

class GameReport extends React.Component {

    refreshPage(){
        window.location.reload(false);
    }

    render() {
        return(
            <div className="report-body">
                <div className="report-card">
                    <div className="time-up">Time is up!</div>
                    <div>
                        <div className="score">Score</div>
                        <div className="word-count">{this.props.count} words</div>
                    </div>
                    
                    <i class="redo icon" id="redo" onClick={this.refreshPage}></i>
                </div>
            </div>
        )
    }
}

export default GameReport;