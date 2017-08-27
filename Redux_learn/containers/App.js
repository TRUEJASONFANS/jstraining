import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';

class App extends React.Component {
    render() {
        const { dispatch, visibleTodos, visibilityFilter } = this.props;
        return <div>
            <TodoInput addTodo={text => this.props.actions.addTodo} />
            <TodoList todos={this.props.todos} actions={this.props.actions} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
      todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      onTodoClick: (id) => {
        dispatch(toggleTodo(id))
      }
    }
  }
module.exports = connect(mapStateToProps, mapDispatchToProps)(App);