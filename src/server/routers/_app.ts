import { z } from 'zod';
import { authenticatedProcedure, procedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import axios from 'axios';

const MAX_POKEMONS = 905;

export const appRouter = router({
  pokemon: procedure.query(async () => {
    const pokemon = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * MAX_POKEMONS)}`
    );
    return pokemon.data;
  }),
  win: authenticatedProcedure
    .input(z.object({ streak: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const actual = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!actual) {
        throw new TRPCError({ code: 'BAD_REQUEST' });
      }

      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          rounds: { increment: 1 },
          wins: { increment: 1 },
          winrate: { set: ((actual.wins + 1) / (actual.rounds + 1)) * 100 },
          ...(input.streak > actual.maxStreak && { maxStreak: { set: input.streak } }),
        },
      });
    }),
  lose: authenticatedProcedure.mutation(async ({ ctx }) => {
    const actual = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!actual) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        rounds: { increment: 1 },
        winrate: { set: (actual.wins / (actual.rounds + 1)) * 100 },
      },
    });
  }),
  ranking: procedure.query(async ({ ctx }) => {
    const wins = await ctx.prisma.user.findMany({
      orderBy: {
        wins: 'desc',
      },
      take: 10,
    });

    const streak = await ctx.prisma.user.findMany({
      orderBy: {
        maxStreak: 'desc',
      },
      take: 10,
    });

    const winrate = await ctx.prisma.user.findMany({
      orderBy: {
        winrate: 'desc',
      },
      take: 10,
    });

    return { wins, streak, winrate };
  }),
});

export type AppRouter = typeof appRouter;
