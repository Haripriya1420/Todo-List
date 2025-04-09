import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarStyle.css";

const Planner = ({ tasks, setTasks }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskInput, setTaskInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Format the selected date as 'YYYY-MM-DD'
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedSelectedDate = formatDate(selectedDate);

  // Filter tasks by the selected date
  const filteredTodos = tasks.filter((todo) => todo.date === formattedSelectedDate);

  const handleAddTask = () => {
    if (!taskInput.trim()) return;

    const newTask = {
      text: taskInput,
      category: categoryInput || "General",
      completed: false,
      date: formattedSelectedDate, // Add the correctly formatted date
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
    setCategoryInput("");
  };

  const toggleComplete = (index) => {
    const taskToToggle = filteredTodos[index];
    const updatedTodos = tasks.map((task) =>
      task.date === taskToToggle.date && task.text === taskToToggle.text
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTodos);
  };

  const handleDeleteTask = (taskToDelete) => {
    const updatedTodos = tasks.filter(
      (task) =>
        !(
          task.text === taskToDelete.text &&
          task.date === taskToDelete.date &&
          task.category === taskToDelete.category
        )
    );
    setTasks(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-pink-200 p-4 flex flex-col items-center">
      <div className="mb-6">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      <h2 className="text-2xl font-bold text-purple-700 mb-2">
        Tasks for {selectedDate.toDateString()}
      </h2>

      <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-md mb-6">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a task"
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
        />
        <input
          type="text"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          placeholder="Category (optional)"
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
        />
        <button
          onClick={handleAddTask}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
        >
          Add Task
        </button>
      </div>

      {filteredTodos.length > 0 ? (
        <ul className="space-y-4 w-full max-w-md">
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-purple-100 rounded-xl shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                  className="h-5 w-5 text-purple-600"
                />
                <span
                  className={`text-base ${
                    todo.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-1 bg-purple-200 text-purple-700 rounded">
                  {todo.category}
                </span>
                <button
                  onClick={() => handleDeleteTask(todo)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No tasks for this date 🎉</p>
      )}
    </div>
  );
};

export default Planner;
