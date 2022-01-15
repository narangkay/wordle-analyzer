import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { inferProcedureOutput } from "@trpc/server";
import { prisma } from "@/utils/db"
import { StartingWord } from '@prisma/client';

const initialWordResult = z.object({
    word: z.string(),
    numGuessed: z.number().int(),
    numNotGuessed: z.number().int(),
    avgGuesses: z.number(),
    rankBySuccessRate: z.number().int(),
    rankByGuessesNeeded: z.number().int(),
});

const appRouter = trpc.router().query('get-starting-words-results', {
    input: z.object({ starting_words: z.array(z.string()) }),
    async resolve({ input }) {
        let results: StartingWord[] = [];
        await Promise.all(input.starting_words.map(async (word) => {
            const result = await prisma.startingWord.findUnique({
                where: {
                    word: word,
                }
            });
            if (result) {
                results.push(result);
            }
        }));
        return {
            results: results
        };
    },
}).mutation("add-starting-word-results", {
    input: z.object({ results: z.array(initialWordResult) }),
    async resolve({ input }) {
        var resultsInDb: z.infer<typeof initialWordResult>[] = [];
        for (const result of input.results) {
            const resultInDb = await prisma.startingWord.upsert({
                where: {
                    word: result.word,
                },
                update: {
                },
                create: {
                    ...result
                }
            });
            resultsInDb.push(resultInDb);
        }
        return { success: true, result: resultsInDb };
    },
}).mutation("delete-all-starting-word-results", {
    async resolve() {
        const deleteUsers = await prisma.startingWord.deleteMany({});
        return { success: true, deleted: deleteUsers.count }
    }
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => null,
});


export type inferQueryResponse<
    TRouteKey extends keyof AppRouter["_def"]["queries"]
    > = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;