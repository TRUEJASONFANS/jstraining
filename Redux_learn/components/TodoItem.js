import React from 'react';

export default class TodoItem extends React.Component {

    handleCompleted() {
        this.props.completeTodo(this.props.todo.id);
    }

    handleDelete() {
        this.props.deleteTodo(this.props.todo.id);
    }

    renderTextStyle(completed) {
        return {
          color: completed ? 'lightgrey' : 'black',
          textDecoration: completed ? 'line-through' : 'none'
        };
    }

    render() {
        const { onClick, completed, text } = this.props;
        var textStyle = this.renderTextStyle(completed);
        return <ul>
            <li onClick={onClick}>
                <div style={textStyle}>
                    {text}
                </div>
            </li>
        </ul>
    }
}