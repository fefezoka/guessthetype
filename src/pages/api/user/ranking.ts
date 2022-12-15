import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function update(req: NextApiRequest, res: NextApiResponse) {
  const wins = await prisma.user.findMany({
    orderBy: {
      wins: 'desc',
    },
    take: 10,
  });

  const streak = await prisma.user.findMany({
    orderBy: {
      maxStreak: 'desc',
    },
    take: 10,
  });

  const winrate = await prisma.user.findMany({
    orderBy: {
      winrate: 'desc',
    },
    take: 10,
  });

  return res.status(201).json({ wins: wins, streak: streak, winrate: winrate });
}
