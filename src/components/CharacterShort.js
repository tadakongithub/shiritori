import React from 'react';
import './CharacterShort.css'

class CharacterShort extends React.Component {

    render() {

        let characterShort = this.props.minimalLength - this.props.wordLength;

        if(characterShort > 0) {
            return <div>Word Length : <span style={{color: '#FF1493'}}>{characterShort} more characters</span></div>
        } else {
            return <div>Word Length : <i class="thumbs up icon" id="thumbup"></i></div>
        }

    }
}

export default CharacterShort;