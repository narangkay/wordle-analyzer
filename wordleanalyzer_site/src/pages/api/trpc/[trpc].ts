import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { inferProcedureOutput } from "@trpc/server";
import { prisma } from "@/utils/db"

const initialWordResult = z.object({
    word: z.string(),
    numGuessed: z.number().int(),
    numNotGuessed: z.number().int(),
    avgGuesses: z.number(),
});

const appRouter = trpc.router().query('get-starting-words-results', {
    input: z.object({ starting_words: z.array(z.string()) }),
    async resolve({ input }) {
        const results = input.starting_words.map(word => { return { word: word } });
        return {
            results: results
        };
    },
}).mutation("add-starting-word-results", {
    input: z.object({ results: z.array(initialWordResult) }),
    async resolve({ input }) {
        var resultsInDb: z.infer<typeof initialWordResult>[] = [];
        for (const result of input.results) {
            const resultInDb = await prisma.startingWord.create({
                data: {
                    ...result
                }
            });
            resultsInDb.push(resultInDb);
        }
        return { success: true, result: resultsInDb };
    },
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