import React from 'react';
import { useForm } from 'react-hook-form';

const AddTodoForm = ({ addTodo }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        addTodo({ 
            id: Date.now(), 
            text: data.text, 
            category: data.category || 'General', 
            dueDate: data.dueDate || null,  
            categoryFilter: data.categoryFilter || 'All',  
            completed: false
        });
        reset(); 
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('text', { required: true })} placeholder="Todo" />
            {errors.text && <span>This field is required</span>}

            <input {...register('category')} placeholder="Category" />

            <input type="date" {...register('dueDate')} />

            <select {...register('categoryFilter')}>
                <option value="All">All</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
            </select>

            <button type="submit">Add Todo</button>
        </form>
    );
};

export default AddTodoForm;
