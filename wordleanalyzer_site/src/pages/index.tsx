import { trpc } from "@/utils/trpc"

const Home = () => {
  const { data, isLoading } = trpc.useQuery(["get-starting-words-stats", { starting_words: ["slops"] }])

  return (<div className="w-screen flex flex-col h-screen justify-center items-center">
    <div className="text-2xl text-center">How good is your starting word?</div>
    <div className='p-2'></div>
    <div className="border rounded p-8 flex flex-col justify-between max-w-2xl items-center">
      <div className='w-80 h-16 text-center fkex'>Top 10 starting words</div>
      <div className='w-80 h-16 text-center fkex'></div>
    </div >
  </div >
  )
}

export default Home