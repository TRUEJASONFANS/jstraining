import React from 'react';
import TextDisplay from './TextDisplay';

export default class TodoInput extends React.Component {
    state = {
        text: ''
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.addTodo(this.state.text);
        this.setState({
            text: ''
        });
    }

    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    render() {
        return <div>
            <form >
                <input type="text" placeholder="Add new todo" autoFocus="true" value={this.state.text} onChange={this.handleChange.bind(this)} />
                <input
                    type="submit"
                    value="Add todo" />
            </form>
            <TextDisplay passedDownText={this.state.text} />
        </div>
    }
}