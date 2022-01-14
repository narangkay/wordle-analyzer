import { trpc } from "@/utils/trpc"
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
  const { data, isLoading } = trpc.useQuery(["get-starting-words-results", { starting_words: ["slops", "clomp", "table", "weird"] }])
  return (<div className="w-screen flex flex-col h-screen justify-start items-center">
    <div className='p-10'></div>
    <div className="text-4xl text-center">How good is your starting word?</div>
    <form className="w-full max-w-xs">
      <div className="flex items-center border-b border-teal-500 py-2">
        <input className="text-6xl  appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="table" aria-label="free text" />
        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-2xl border-4 text-white py-1 px-2 rounded" type="button">
          Search!
        </button>
      </div>
    </form>
    <div className='p-10'></div>
    <div className=" p-2 flex flex-col justify-between w-full max-w-lg">
      <div className='w-full  h-16 text-center fkex text-4xl'>Top 5 starting words globally</div>
      <InitialWordsAccordian results={data} />
    </div >
  </div >
  )
}

export default Home