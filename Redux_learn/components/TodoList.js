import React from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {

    render() {
        return <div>
            {
                this.props.todos.map(function (todo) {
                    return (
                        <TodoItem key={todo.id}
                            todo={todo}
                            deleteTodo={this.props.actions.deleteTodo}
                            completeTodo={this.props.actions.completeTodo} />
                    )
                }.bind(this))
            }
        </div>
    }
}