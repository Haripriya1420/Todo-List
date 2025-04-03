import React from 'react';

const TodoItem = ({ todo, onComplete, onDelete }) => {
    const handleComplete = () => {
        if (onComplete) {
            onComplete(todo.id);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(todo.id);
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={handleComplete} 
            />
            
            {}
            <span>{todo.text} ({todo.category}) - {todo.dueDate || 'No Due Date'}</span>

            <button onClick={handleDelete} aria-label="Delete Todo">
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
};

export default TodoItem;
