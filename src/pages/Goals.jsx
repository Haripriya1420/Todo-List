import React, { useState, useEffect } from "react";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState("");
  const [deadlineInput, setDeadlineInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const categoryOptions = ["📈 Career", "🏋🏻 Gym", "💰 Finance", "📚 Education", "🏡 Personal"];

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(savedGoals);
  }, []);

  const handleAddGoal = () => {
    if (!goalInput.trim()) return;

    const newGoal = {
      text: goalInput,
      deadline: deadlineInput,
      category: categoryInput || "General",
      completed: false,
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));

    setGoalInput("");
    setDeadlineInput("");
    setCategoryInput("");
  };

  const toggleComplete = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const handleDelete = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const sortedGoals = [...goals].sort((a, b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.completed).length;
  const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 p-6 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-purple-700 mb-4 drop-shadow-lg text-center">
        ✨ My Beautiful Goals ✨
      </h2>

      {/* Motivational Quote */}
      <p className="text-lg italic text-purple-600 mb-6 text-center max-w-xl">
        “I never dreamed about success. I worked for it.”  
      </p>

      {/* Progress Bar */}
      {totalGoals > 0 && (
        <div className="w-full max-w-xl mb-6">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span className="text-gray-700">Progress</span>
            <span className="text-gray-700">{completedGoals}/{totalGoals}</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Input Fields */}
      <div className="w-full max-w-xl bg-white p-6 rounded-3xl shadow-2xl mb-8">
        <input
          type="text"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          placeholder="🧿 Enter your goal"
          className="w-full border border-gray-300 rounded-xl p-3 mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="date"
          value={deadlineInput}
          onChange={(e) => setDeadlineInput(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <select
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 mb-4 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">💡 Choose a category</option>
          {categoryOptions.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddGoal}
          className="w-full bg-purple-500 text-white py-3 px-4 rounded-xl hover:bg-purple-600 transition font-semibold shadow-md"
        >
           Add Goal
        </button>
      </div>

      {/* Goal List */}
      {sortedGoals.length > 0 ? (
        <ul className="space-y-5 w-full max-w-xl">
          {sortedGoals.map((goal, index) => (
            <li
              key={index}
              className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between border-l-8 border-purple-300 hover:border-purple-500 transition"
            >
              <div className="flex flex-col w-full sm:flex-row sm:items-center sm:justify-between sm:space-x-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => toggleComplete(index)}
                    className="h-5 w-5 text-purple-600"
                  />
                  <span
                    className={`text-lg ${
                      goal.completed ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {goal.text}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mt-2 sm:mt-0">
                  {goal.deadline && (
                    <span className="text-sm text-blue-600">⌛ {goal.deadline}</span>
                  )}
                  <span className="text-xs px-2 py-1 bg-pink-200 text-pink-700 rounded-full font-medium shadow-sm">
                    {goal.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-400 hover:text-red-600 text-lg ml-4"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 mt-6">No goals yet! Setting goals is the first step in turning the invisible into the visible. ✨</p>
      )}
    </div>
  );
};

export default Goals;
