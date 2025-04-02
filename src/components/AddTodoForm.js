import React from 'react';
import { useForm } from 'react-hook-form';

const AddTodoForm = ({ addTodo }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        addTodo({ 
            id: Date.now(), 
            text: data.text, 
            category: data.category || 'General', 
            dueDate: data.dueDate, 
            CategoryFilter: data.CategoryFilter,
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
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default AddTodoForm;