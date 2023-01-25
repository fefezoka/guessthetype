import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function win(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req: req });
  if (!session) {
    return res.status(200).json({ message: 'authorization error' });
  }

  const { id, streak } = req.body;

  if (!id || !streak) {
    return res.status(200).json({ message: 'error' });
  }

  const actual = await prisma.user.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!actual) {
    return res.status(400);
  }

  const response = await prisma.user.update({
    where: {
      id: id as string,
    },
    data: {
      rounds: { increment: 1 },
      wins: { increment: 1 },
      winrate: { set: ((actual.wins + 1) / (actual.rounds + 1)) * 100 },
      ...(streak > actual.maxStreak && { maxStreak: { set: streak } }),
    },
  });

  return res.status(201).json(response);
}
