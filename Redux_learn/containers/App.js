import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  addTodo,
  completeTodo,
  setVisibilityFilter,
  VisibilityFilters
} from '../redux/actions';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

class App extends React.Component {
  render() {
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    return <div>
      <TodoInput onAddClick={text => dispatch(addTodo(text))} />
      <TodoList todos={visibleTodos}
        onTodoClick={index => dispatch(completeTodo(index))} />
      <Footer filter={visibilityFilter} onFilterChange={
        nextFilter => dispatch(setVisibilityFilter(nextFilter))
      } />
    </div>
  }
}

App.PropTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })),
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
};

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

// 这里的 state 是 Connect 的组件的
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
}

export default connect(select)(App);