// app/api/recommendations/route.js
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getRecommendations } from 'lib/recommendations';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const partnerId = req.query.partnerId;

  if (!partnerId || isNaN(Number(partnerId))) {
    return res.status(400).json({ message: 'Invalid partner ID' });
  }

  try {
    const recommendations = await getRecommendations(Number(partnerId));
    return res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}