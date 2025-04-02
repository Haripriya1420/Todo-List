import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import useTodos from './hooks/useTodos';
import AddTodoForm from './components/AddTodoForm';
import TodoItem from './components/TodoItem';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import './styles/App.css';

const App = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { todos, addTodo, completeTodo, deleteTodo, filterTodos } = useTodos();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredTodos = filterTodos(filter).filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div className={isDarkMode ? 'app dark' : 'app'}>
            <header>
                <h1>Todo List</h1>
                <button onClick={toggleTheme} aria-label="Toggle dark mode">
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* Pass addTodo to AddTodoForm */}
            <AddTodoForm addTodo={addTodo} />
            <CategoryFilter setFilter={setFilter} />
            <div className="todo-list">
                {filteredTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onComplete={completeTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </div>
            <footer>
            <p>Created by Hari Priya</p>
                <a href="GitHub URL" target="_blank" rel="noopener noreferrer">GitHub Project</a>
                <a href="Netlify URL" target="_blank" rel="noopener noreferrer">Live Demo</a>
            </footer>
        </div>
    );
};


const MainApp = () => (
    <ThemeProvider>
        <App />
    </ThemeProvider>
);

export default MainApp;