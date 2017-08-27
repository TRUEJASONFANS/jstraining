import React from 'react';

export default class TextDisplay extends React.Component {
    render() {
        return <div>
            {this.props.passedDownText}
        </div>
    }
}