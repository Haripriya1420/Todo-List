import React from 'react';

const priorityColors = {
  High: 'bg-red-500 text-white',
  Medium: 'bg-yellow-400 text-black',
  Low: 'bg-green-500 text-white',
};

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
    <div
      className={`flex items-center justify-between p-4 border rounded-lg shadow-sm mb-2 ${
        todo.completed ? 'bg-gray-100 line-through text-gray-400' : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleComplete}
          className="h-5 w-5"
        />

        <div>
          <p className="text-sm font-medium">
            {todo.text} ({todo.category}) - {todo.dueDate || 'No Due Date'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold ${
            priorityColors[todo.priority] || 'bg-gray-300 text-black'
          }`}
        >
          {todo.priority || 'Medium'}
        </span>

        <button onClick={handleDelete} aria-label="Delete Todo">
          <i className="fas fa-trash text-red-500 hover:text-red-700"></i>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
