import React from "react";
import {
  startOfWeek,
  endOfWeek,
  format,
  parseISO,
} from "date-fns";

const Weekly = ({ tasks, setTasks }) => {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 }); 
  const end = endOfWeek(today, { weekStartsOn: 1 });

  
  const weeklyTasks = tasks.filter((task) => {
    const taskDate = parseISO(task.date);
    return taskDate >= start && taskDate <= end;
  });

  
  const grouped = {};
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    const key = format(day, "yyyy-MM-dd");
    grouped[key] = [];
  }

  weeklyTasks.forEach((task) => {
    grouped[task.date] = grouped[task.date] || [];
    grouped[task.date].push(task);
  });

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-pink-100 via-purple-100 to-yellow-100">
      <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
        Weekly Tasks
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(grouped).map(([date, dayTasks]) => (
          <div key={date} className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-lg font-semibold text-purple-600 mb-3">
              {format(parseISO(date), "EEEE, MMM d")}
            </h3>

            {dayTasks.length > 0 ? (
              <ul className="space-y-2">
                {dayTasks.map((task, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-purple-100 p-2 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-sm ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {task.text}
                      </span>
                      <span className="text-xs text-purple-700 bg-purple-200 px-2 py-1 rounded">
                        {task.category}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No tasks 📭</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weekly;
