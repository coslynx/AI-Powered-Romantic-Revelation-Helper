'use client';

import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { useFormik } from 'formik';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../lib/schemas';
import { createPartnerProfile } from '../lib/api';

interface PartnerProfileFormProps {
  onSubmit: (values: PartnerProfile) => Promise<void>;
}

const PartnerProfileForm: React.FC<PartnerProfileFormProps> = ({ onSubmit }) => {
  const store = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (data: PartnerProfile) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      store.setPartnerProfile(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error creating partner profile:', error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Partner's Name
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Partner's Email
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="interests"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Partner's Interests (Select Multiple)
        </label>
        <select
          id="interests"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register('interests', { multiple: true })}
        >
          <option value="Movies">Movies</option>
          <option value="Music">Music</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Art">Art</option>
          <option value="Sports">Sports</option>
          {/* Add more interests here */}
        </select>
        {errors.interests && (
          <p className="text-red-500 text-xs italic">{errors.interests.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Profile...' : 'Create Profile'}
        </button>
      </div>
    </form>
  );
};

export default PartnerProfileForm;