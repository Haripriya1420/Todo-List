import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Weekly from "./pages/Weekly";
import Goals from "./pages/Goals";

const App = () => {
  const [todos, setTodos] = useState([]); // Shared todos state

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Router>
      <div className="min-h-screen">
        <nav className="flex flex-wrap justify-center gap-4 p-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
          {[
            { path: "/", label: "Home" },
            { path: "/planner", label: "Planner" },
            { path: "/weekly", label: "Weekly" },
            { path: "/goals", label: "Goals" },
          ].map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-6 py-3 rounded-full font-semibold text-center transition duration-300 w-32 ${isActive ? "bg-white text-purple-600 shadow-md" : "bg-purple-600 text-white hover:bg-purple-700"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<Home todos={todos} setTodos={setTodos} />} />
          <Route path="/planner" element={<Planner tasks={todos} setTasks={setTodos} />} />
          <Route path="/weekly" element={<Weekly tasks={todos} />} />
          <Route path="/goals" element={<Goals />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
