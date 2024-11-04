'use client';

import React from 'react';
import { useStore } from '../lib/store';
import { formatCurrency } from '../lib/utils/formatters';
import { FaHeart, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';

// Type definition for a Recommendation
interface Recommendation {
  id: number;
  title: string;
  description: string;
  type: string; // 'Meal', 'Gift', 'Date', etc.
  imageUrl: string;
  price: number;
  location: string; //  For restaurant/event locations
  date: string; //  Date of the activity/event (formatted string)
}

// RecommendationCard Component Definition
const RecommendationCard: React.FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
  const store = useStore();
  const { id, title, description, type, imageUrl, price, location, date } =
    recommendation;

  const handleAddToFavorites = () => {
    store.addToFavorites(id); // Update favorites state in the store
  };

  return (
    <div className="rounded-lg shadow-md bg-white p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-40 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <p className="text-gray-500 text-sm mt-2">{type}</p>
        <p className="text-gray-500 text-sm mt-2">
          <span className="font-bold">Price:</span>{' '}
          {formatCurrency(price)}
        </p>
        <div className="flex items-center mt-2">
          {location && (
            <div className="flex items-center mr-4">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <span className="text-gray-500 text-sm">{location}</span>
            </div>
          )}
          {date && (
            <div className="flex items-center">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              <span className="text-gray-500 text-sm">{date}</span>
            </div>
          )}
        </div>
        <div className="mt-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
            onClick={handleAddToFavorites}
          >
            <FaHeart className="mr-2" />
            Save to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;