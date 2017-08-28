import React from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
    constructor() {
        super();
    }
    render() {
        return <div>
            {
                this.props.todos.map(function (todo, index) {
                    console.log(todo);
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