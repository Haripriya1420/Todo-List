import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Home = ({ todos, setTodos }) => {
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("All");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const addTodo = () => {
    if (todo.trim()) {
      const newTodo = {
        id: Date.now(), // Unique identifier
        text: todo,
        category,
        date,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setTodo("");
      setDate("");
    }
  };
  
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);
  };
  
  const deleteTodo = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (confirmDelete) {
      setTodos(todos.filter((t) => t.id !== id));
      toast.success("Todo deleted successfully!");
    }
  };
  
  

  const filteredTodos = todos
    .filter((t) => category === "All" || t.category === category)
    .filter((t) => {
      if (statusFilter === "Pending") return !t.completed;
      if (statusFilter === "Completed") return t.completed;
      return true;
    })
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-purple-300 via-pink-300 to-red-300"}`}>
      <div className={`p-10 rounded-2xl shadow-2xl w-full max-w-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold">Todo List</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="bg-purple-600 text-white px-4 py-2 rounded-full">Dark Mode</button>
        </div>

        <input 
          type="text" 
          placeholder="Search todos..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className={`w-full p-4 border rounded-full mb-4 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} 
        />

        <div className="flex space-x-2 mb-4">
          <input 
            type="text" 
            placeholder="Todo" 
            value={todo} 
            onChange={(e) => setTodo(e.target.value)} 
            className={`w-2/3 p-4 border rounded-full ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} 
          />
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className={`w-1/3 p-4 border rounded-full ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} 
          >
            <option value="All">All</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className={`w-full p-4 border rounded-full mb-4 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} 
        />

        <button onClick={addTodo} className="bg-purple-600 text-white w-full p-4 rounded-full mb-4">Add Todo</button>

        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)} 
          className={`w-full p-4 border rounded-full mb-4 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} 
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        {filteredTodos.length > 0 ? (
          <ul>
            {filteredTodos.map((t, index) => (
              <li key={t.id} className={`flex justify-between items-center p-4 rounded-lg shadow mb-2 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <div>
                  <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(t.id)} className="mr-2" />
                  <strong>{t.text}</strong> <span className="text-gray-400">{t.date}</span>
                </div>
                <button
                  onClick={() => deleteTodo(t.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete Todo"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No tasks found</p>
        )}

        <div className="text-center mt-6">
          <p>Created by Hari Priya</p>
          <a href="https://github.com/Haripriya1420/Todo-List" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            GitHub Project
          </a>
        </div>
        <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
      </div>
    </div>
  );
};

export default Home;
