import React from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '../lib/store';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import PartnerProfileForm from '../components/PartnerProfileForm';
import RecommendationsList from '../components/RecommendationsList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRecommendations } from '../lib/recommendations';

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const store = useStore();
  const { isLoading, error, data: recommendations } = useQuery(
    ['recommendations'],
    () => getRecommendations(),
    {
      onSuccess: (data) => {
        store.setRecommendations(data);
      },
      onError: (error) => {
        toast.error('Error fetching recommendations');
        console.error('Error fetching recommendations:', error);
        Sentry.captureException(error);
      },
    }
  );

  const createPartnerProfile = async (values) => {
    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create partner profile');
      }

      toast.success('Partner profile created!');
      router.push('/recommendations');
    } catch (error) {
      toast.error('Error creating partner profile');
      console.error('Error creating partner profile:', error);
      Sentry.captureException(error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen">Error fetching recommendations</div>;
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        {session?.user ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-4">Personalized Recommendations for {session.user.name}</h1>
            <RecommendationsList recommendations={recommendations} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-4">Create a Partner Profile</h1>
            <PartnerProfileForm onSubmit={createPartnerProfile} />
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}