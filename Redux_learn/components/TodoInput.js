import React from 'react';
import TextDisplay from './TextDisplay';

export default class TodoInput extends React.Component {
    state = {
        text: ''
    }
    handleClick(e) {
        console.log('XXX onclick' + this.state.text);
        e.preventDefault();
        this.props.onAddClick(this.state.text);
    }

    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    render() {
        return <div>
            <div >
                <input type="text" placeholder="Add new todo" autoFocus="true" value={this.state.text} onChange={this.handleChange.bind(this)} />
                <button 
                    onClick={ this.handleClick.bind(this) }
                    value="Add todo" >
                    Add
                 </button>   
            </div>
        </div>
    }
}