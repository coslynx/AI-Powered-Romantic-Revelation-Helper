'use client';

import React from 'react';
import { useStore } from '../lib/store';
import RecommendationCard from './RecommendationCard';

const RecommendationsList: React.FC<{ recommendations: Recommendation[] }> = ({ recommendations }) => {
  const store = useStore();
  const recommendationsData = store.recommendations;
  const error = store.recommendationsError;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {error ? (
        <p className="text-center text-red-500">Error fetching recommendations. Please try again later.</p>
      ) : (
        recommendationsData.length > 0 ? (
          recommendationsData.map((recommendation) => (
            <RecommendationCard key={recommendation.id} recommendation={recommendation} />
          ))
        ) : (
          <p className="text-center text-gray-500">No recommendations found. Please create a partner profile.</p>
        )
      )}
    </div>
  );
};

export default RecommendationsList;