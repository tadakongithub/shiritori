import React from 'react';

class CharacterShort extends React.Component {

    render() {

        let characterShort = this.props.minimalLength - this.props.wordLength;

        if(characterShort > 0) {
            return <div>Word Length : <span style={{color: '#f0ad4e'}}>{characterShort} more characters</span></div>
        } else {
            return <div>Word Length : <i class="thumbs up green icon"></i></div>
        }

    }
}

export default CharacterShort;