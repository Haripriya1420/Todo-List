import React from "react";

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ["All", "Work", "Personal", "Shopping"];

  return (
    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-4 border rounded-full mb-4">
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
