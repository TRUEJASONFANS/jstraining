'use strict';
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

let nextTodoId = 0;

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

export function addTodo(text) {
  console.log('ACTIONS: ADD TODO INVOKE' + text);
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text
  };
}

export function completeTodo(id) {
  console.log('COMPLETETODO INVOKE');
  return {
    type: COMPLETE_TODO,
    id
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  };
}
