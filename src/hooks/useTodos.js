import { useState } from 'react';

const useTodos = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    };

    const completeTodo = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const filterTodos = (filter) => {
        if (filter === 'all') return todos;
        return todos.filter(todo => todo.category === filter);
    };

    return { todos, addTodo, deleteTodo, completeTodo, filterTodos };
};

export default useTodos;