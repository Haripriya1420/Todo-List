import React from 'react';

const CategoryFilter = ({ setFilter }) => {
    console.log('setFilter:', setFilter); 

    return (
        <select onChange={(e) => setFilter(e.target.value)} className="border p-2 mb-4">
            <option value="all">All</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
        </select>
    );
};

export default CategoryFilter;