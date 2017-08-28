'use strict';
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

export function addTodo(text) {
  console.log('ACTIONS: ADD TODO INVOKE' + text);
  return {
    type: ADD_TODO,
    text
  };
}

export function completeTodo(index) {
  console.log('COMPLETETODO INVOKE');
  return {
    type: COMPLETE_TODO,
    index
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  };
}
