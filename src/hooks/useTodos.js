import { useState, useEffect } from 'react';

const useTodos = () => {
    const [todos, setTodos] = useState(() => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    });


    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

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

    const filteredTodos = selectedCategory === "all"
        ? todos
        : todos.filter(todo => todo.category.toLowerCase() === selectedCategory.toLowerCase());
    
    console.log("Selected Category:", selectedCategory);
    console.log("Filtered Todos:", filteredTodos);

    return { 
        todos: filteredTodos, 
        addTodo, 
        deleteTodo, 
        completeTodo, 
        selectedCategory, 
        setSelectedCategory 
    };
};

export default useTodos;
