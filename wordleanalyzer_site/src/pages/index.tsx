import { trpc } from "@/utils/trpc"
import { inferQueryResponse } from "@/pages/api/trpc/[trpc]";
import dynamic from 'next/dynamic'

const InitialWordsAccordianlWithNoSSR = dynamic(
  () => import('@/pages/InitialWordsAccordian'),
  { ssr: false }
)

const Home = () => {
  const { data, isLoading } = trpc.useQuery(["get-starting-words-stats", { starting_words: ["slops", "clomp", "table", "weird"] }])
  return (<div className="w-screen flex flex-col h-screen justify-center items-center">
    <div className="text-4xl text-center">How good is your starting word?</div>
    <form className="w-full max-w-xs">
      <div className="flex items-center border-b border-teal-500 py-2">
        <input className="text-6xl  appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="table" aria-label="free text" />
        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
          Tell me!
        </button>
      </div>
    </form>
    <div className='p-10'></div>
    <div className=" p-2 flex flex-col justify-between w-full max-w-md">
      <div className='w-full  h-16 text-center fkex text-4xl'>Top 5 starting words</div>
      <InitialWordsAccordianlWithNoSSR results={data} />
    </div >
  </div >
  )
}

export default Home