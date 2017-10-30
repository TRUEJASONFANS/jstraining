let nextTodoId = 0;
export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
})

export const setVisibilityFilter = (fitler) => ({
    type: 'SET_VISIBILITY_FILTER',
    fitler
})

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
})