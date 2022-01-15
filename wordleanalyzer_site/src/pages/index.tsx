import { trpc } from "@/utils/trpc"
import Link from "next/link";
import React, { useState } from "react";
import CustomWordLookupForm from "./CustomWordLookupForm";
import InitialWordsAccordian from "./InitialWordsAccordian";

// var result: string[][] = [];

// const sleep = (milliseconds: number) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

// function backfillDb(addResult: any) {
//   return async () => {
//     for (let i = 0; i < result.length; i += 50) {
//       console.log("Mutating ", result[i]);
//       let temporary = result.slice(i, i + 50);
//       const creation = await addResult.mutate({
//         results: temporary.map((r, idx) => ({
//           word: r[0],
//           numGuessed: parseInt(r[2]),
//           numNotGuessed: parseInt(r[3]),
//           avgGuesses: parseFloat(r[1]),
//           rankBySuccessRate: parseInt(r[4]),
//           rankByGuessesNeeded: parseInt(r[5]),
//         })),
//       })
//       console.log("Creation?", creation);
//       await sleep(5000);
//     }
//   }
// }

const Home = () => {
  const {
    data: startingWordResults,
    refetch,
    isLoading,
  } = trpc.useQuery(["get-starting-words-results", {
    starting_words: [
      "clomp",
      "clump",
      "compt",
      "plong",
      "mulct",
      "clapt",
      "plant",
      "plack",
      "nempt",
      "pluck"
    ]
  }], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
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
  return (<div className="w-screen flex flex-col h-screen justify-start items-center">
    <div className='p-4'></div>
    < CustomWordLookupForm setEnableSearch={setEnableSearch} setWordToSearch={setWordToSearch} searchResults={customStartingWordResult?.results} />
    <div className='p-4'></div>
    <div className=" p-2 flex flex-col justify-between w-full max-w-4xl">
      <div className='w-full  text-center fkex text-4xl'>Top 10 starting words globally</div>
      <div className='p-4'></div>
      <InitialWordsAccordian results={startingWordResults?.results} />
    </div >
    <div className="w-full text-xl text-center pb-2">
      <a href="https://twitter.com/ancestrai">Twitter</a>
      <span className="p-4">{"-"}</span>
      <Link href="/about">
        <a>About</a>
      </Link>
      <span className="p-4">{"-"}</span>
      <a href="https://www.github.com/narangkay/">Github</a>
    </div>
  </div >
  )
}

export default Home