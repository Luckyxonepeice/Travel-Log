import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createLogEntry } from './API';

const LogForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    //console.log(data);
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude; 
      data.rating =0;
      //console.log(data);
      await createLogEntry(data);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      { error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title"  {...register('title',{required:true})} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} {...register('comments')}></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} {...register('description')}></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" {...register('image')} />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date"  {...register('visitDate',{required:true})} />
      <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
    </form>
  );
};

export default LogForm;