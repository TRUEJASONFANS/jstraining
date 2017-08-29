import {
  ADD_TODO,
  COMPLETE_TODO
} from '../actions';
import undoable from 'redux-undo';

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      console.log("ADD_TODO invoke");
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ];
    default:
      return state
  }
}

const undoableTodos = undoable(todos)

export default undoableTodos
