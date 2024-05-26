import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'Pending',
}


const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del pecado'),
    ],
    filter: Filters.All,

}

const initStore = () => {
    loadStore();
    console.log('InitStore ');
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;

    const {todos =[], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
    
}

const saveStateToLocalStorage = () => {
    
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (Filter = Filters.All) => {
    switch (Filter) {
        case Filters.All:
            return [...state.todos];
        
        case Filters.Completed:
            return state.todos.filter(todo => todo.done); //si todo.done es true lo regresa
      
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done); //si todo.done es false lo regresa

        default:
            throw new Error(`Option ${ Filter } is not valid.`);
    }
}

/**
 * 
 * @param {String} description
 */
const addTodo = (description) => {
    if(!description) throw new Error('Description is required');
    
    state.todos.push( new Todo(description));

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    })

    saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);

    saveStateToLocalStorage();
}

const deleteCompleted = (todoId) => {
    state.todos = state.todos.filter( todo => !todo.done);

    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;

    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter
}

export default {
    addTodo,
    getTodos,
    initStore,
    loadStore,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
}