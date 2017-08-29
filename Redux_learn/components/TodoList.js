import React from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
    render() {
        return <div>
            {
                this.props.todos.present.map(function (todo, index) {
                    return (
                        <TodoItem
                            {...todo}
                            onClick={() => this.props.onTodoClick(index)}
                            key={index} />
                    )
                }.bind(this))
            }
        </div>
    }
}