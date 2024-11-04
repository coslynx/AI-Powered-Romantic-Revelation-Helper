import { PrismaClient } from '@prisma/client';
import { Session } from 'next-auth/react';
import { Store } from 'zustand';
import { FormikProps } from 'formik';
import { UseFormReturn } from 'react-hook-form';
import { AxiosInstance } from 'axios'; 

//  Import necessary types and interfaces from existing files
import { PartnerProfile, Recommendation } from '../types';

const prisma = new PrismaClient();

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  //  Implement phone number formatting logic here
  return phoneNumber;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

export const generateRecommendations = async (
  partnerId: number,
  prismaClient: PrismaClient
): Promise<Recommendation[]> => {
  try {
    const recommendations = await prismaClient.recommendation.findMany({
      where: { partnerId },
    });
    return recommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
};

export const handlePartnerProfileCreation = async (
  values: PartnerProfile,
  prismaClient: PrismaClient,
  store: Store<{
    partnerProfile: PartnerProfile;
    setPartnerProfile: (partnerProfile: PartnerProfile) => void;
    recommendations: Recommendation[];
    setRecommendations: (recommendations: Recommendation[]) => void;
  }>,
  formikProps: FormikProps<PartnerProfile>,
  useForm: UseFormReturn<PartnerProfile>
): Promise<void> => {
  try {
    const createdPartner = await prismaClient.partner.create({
      data: values,
    });
    store.setPartnerProfile(createdPartner);
    formikProps.setSubmitting(false);
    useForm.reset();
    //  Fetch recommendations based on the created partner
    const recommendations = await generateRecommendations(
      createdPartner.id,
      prismaClient
    );
    store.setRecommendations(recommendations);
  } catch (error) {
    console.error('Error creating partner profile:', error);
    formikProps.setSubmitting(false);
  }
};

export const handleSignOut = async (
  session: Session,
  store: Store<{
    partnerProfile: PartnerProfile;
    setPartnerProfile: (partnerProfile: PartnerProfile) => void;
    recommendations: Recommendation[];
    setRecommendations: (recommendations: Recommendation[]) => void;
  }>,
  axiosInstance: AxiosInstance
): Promise<void> => {
  try {
    await axiosInstance.post('/api/auth/signout', {
      token: session.user.accessToken,
    });
    store.setPartnerProfile(null);
    store.setRecommendations([]);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};