import React from 'react';

export default class TodoItem extends React.Component {

    handleCompleted() {
        this.props.completeTodo(this.props.todo.id);
    }

    handleDelete() {
        this.props.deleteTodo(this.props.todo.id);
    }

    renderTextStyle() {
        return {
          color: this.props.todo.completed ? 'lightgrey' : 'black',
          textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        };
    }

    render() {
        var textStyle = this.renderTextStyle();
        return <ul>
            <li>
                <div style={textStyle}>
                    {this.props.todo.text}
                </div>
                <button onClick={this.handleCompleted}>toggle completed</button>
                <button onClick={this.handleDelete}>delete</button>
            </li>
        </ul>
    }
}