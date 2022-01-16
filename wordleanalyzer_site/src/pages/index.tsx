import { trpc } from "@/utils/trpc"
// import { StartingWord } from "@prisma/client";
// import { TRPCClientErrorLike } from "@trpc/client";
// import { DefaultErrorShape } from "@trpc/server";
// import { Procedure } from "@trpc/server/dist/declarations/src/internals/procedure";
// import { Router } from "@trpc/server/dist/declarations/src/router";
import Link from "next/link";
import React, { useState } from "react";
// import { UseMutationResult } from "react-query";
import CustomWordLookupForm from "./CustomWordLookupForm";
import InitialWordsAccordian from "./InitialWordsAccordian";

// var result: string[][] = [];

// const sleep = (milliseconds: number) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

// function backfillDb(addResult: UseMutationResult<{ success: boolean; result: { word: string; numGuessed: number; numNotGuessed: number; avgGuesses: number; rankBySuccessRate: number; rankByGuessesNeeded: number; }[]; }, TRPCClientErrorLike<Router<unknown, unknown, Record<"get-starting-words-results", Procedure<unknown, unknown, { starting_words: string[]; }, { starting_words: string[]; }, { results: StartingWord[]; }>>, Record<"add-starting-word-results", Procedure<unknown, unknown, { results: { word: string; numGuessed: number; numNotGuessed: number; avgGuesses: number; rankBySuccessRate: number; rankByGuessesNeeded: number; }[]; }, { results: { word: string; numGuessed: number; numNotGuessed: number; avgGuesses: number; rankBySuccessRate: number; rankByGuessesNeeded: number; }[]; }, { success: boolean; result: { word: string; numGuessed: number; numNotGuessed: number; avgGuesses: number; rankBySuccessRate: number; rankByGuessesNeeded: number; }[]; }>> & Record<"delete-all-starting-word-results", Procedure<unknown, unknown, undefined, undefined, { success: boolean; deleted: number; }>>, {}, DefaultErrorShape>>, { results: { word: string; numGuessed: number; numNotGuessed: number; avgGuesses: number; rankBySuccessRate: number; rankByGuessesNeeded: number; }[]; }, unknown>, deleteUsers: UseMutationResult<{ success: boolean; deleted: number; }, TRPCClientErrorLike<Router<unknown, unknown, Record<"get-starting-words-results", Procedure<unknown, unknown, { starting_words: string[]; }, { starting_words: string[]; }, { results: StartingWord[]; }>>, Record<"add-starting-word-results", Procedure<unknown, unknown, { results: { word: string; numGuessed: number; numNotGuessed: number; avgGuesses: number; rankBySuccessRate: number; rankByGuessesNeeded: number; }[]; }, { results: { word: string; numGuessed: number; numNotGuessed: number; avgGuesses: number; rankBySuccessRate: number; rankByGuessesNeeded: number; }[]; }, { success: boolean; result: { word: string; numGuessed: number; numNotGuessed: number; avgGuesses: number; rankBySuccessRate: number; rankByGuessesNeeded: number; }[]; }>> & Record<"delete-all-starting-word-results", Procedure<unknown, unknown, undefined, undefined, { success: boolean; deleted: number; }>>, {}, DefaultErrorShape>>, void | null | undefined, unknown>) {
//   return async () => {
//     // await deleteUsers.mutateAsync();
//     // if (!deleteUsers.data || !deleteUsers.data.success) {
//     //   console.log("failed to delete")
//     //   return;
//     // }
//     // console.log(deleteUsers.data.deleted);
//     for (let i = 0; i < result.length; i += 50) {
//       console.log("Mutating ", result[i]);
//       let temporary = result.slice(i, i + 50);
//       addResult.mutateAsync({
//         results: temporary.map((r, idx) => ({
//           word: r[0],
//           numGuessed: parseInt(r[2]),
//           numNotGuessed: parseInt(r[3]),
//           avgGuesses: parseFloat(r[1]),
//           rankBySuccessRate: parseInt(r[4]),
//           rankByGuessesNeeded: parseInt(r[5]),
//         })),
//       }).then(creation => {
//         console.log("Creation?", creation);
//       });
//       await sleep(2000);
//     }
//   }
// }

const Home = () => {
  const {
    data: startingWordResultsUnfiltered,
  } = trpc.useQuery(["get-starting-words-results", {
    starting_words: [
      "tamps",
      "midst",
      "comps",
      "timps",
      "damps",
      "plast",
      "plasm",
      "clasp",
      "compt",
      "dwams"
    ]
  }], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const {
    data: startingWordResultsFiltered,
  } = trpc.useQuery(["get-starting-words-results", {
    starting_words: [
      "midst",
      "clasp",
      "clump",
      "stomp",
      "strap",
      "stamp",
      "scalp",
      "motif",
      "splat",
      "scald",
    ]
  }], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const [checked, setChecked] = React.useState(true);
  const [wordToSearch, setWordToSearch] = useState('');
  const [enableSearch, setEnableSearch] = useState(false);
  const {
    data: customStartingWordResult,
  } = trpc.useQuery(["get-starting-words-results", {
    starting_words: [wordToSearch]
  }], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: enableSearch,
  })
  // const addResult = trpc.useMutation("add-starting-word-results", {
  //   retry: 3,
  // });
  // const deleteUsers = trpc.useMutation("delete-all-starting-word-results");
  return (<div className="w-screen flex flex-col h-screen justify-start items-center">
    <div className='p-4'></div>
    {/* <button onClick={backfillDb(addResult, deleteUsers)}>Click me</button> */}
    < CustomWordLookupForm setEnableSearch={setEnableSearch} setWordToSearch={setWordToSearch} searchResults={customStartingWordResult?.results} />
    <div className='p-4'></div>
    <div className=" p-2 flex flex-col justify-between w-full max-w-4xl">
      <div className='w-full  text-center fkex text-4xl'>Top 10 Wordle starting words globally</div>
      <div className='p-4'></div>
      <div className="flex">
        <div className='w-full  text-right fkex text-md'>Filter to commmon Wordle words</div>
        <div className='p-1'></div>
        <input checked={checked} onChange={() => setChecked(!checked)} className="mr-2 leading-tight" type="checkbox"></input>
      </div>
      <div className='p-1'></div>
      <InitialWordsAccordian results={(checked ? startingWordResultsFiltered : startingWordResultsUnfiltered)?.results} />
    </div >
    <div className="w-full text-xl text-center pb-2">
      <a href="https://twitter.com/ancestrai">Twitter</a>
      <span className="p-4">{"-"}</span>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  </div >
  )
}

export default Home