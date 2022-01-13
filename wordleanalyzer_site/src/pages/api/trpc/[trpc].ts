import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { inferProcedureOutput } from "@trpc/server";

const appRouter = trpc.router().query('get-starting-words-stats', {
    input: z.object({ starting_words: z.array(z.string()) }),
    resolve({ input }) {
        return {
            results: input.starting_words
        };
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