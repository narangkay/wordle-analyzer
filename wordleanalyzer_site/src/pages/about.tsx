import Head from "next/head";
import Link from "next/link";

const AboutPage = () => {
    return (
        <div>
            <Head>
                <title>About - WordleAnalyzer</title>
                <meta
                    name="description"
                    content="WordleAnalyzer is a site that ranks all possible Wordle starting words."
                />
            </Head>
            <div className="flex flex-col items-center text-xl">
                <h2 className="text-4xl">About</h2>
                <div className="p-2"></div>
                <p className="max-w-xl">
                    I made this because I&apos;m obsessed with wordle and I think you should be obsessed with wordle too.
                </p>
                <div className="p-4"></div>
                <h1 className="text-4xl">Methodology</h1>
                <div className="p-2"></div>
                <p className="max-w-xl">
                    Wordle Analyzer pits every 5-letter word in existence as the starting word against every other 5-letter word in existence as the hidden word, and tries to figure out which words are best suited as starting words.
                    <br /><br />Subsequent words (after the starting word) are selected by an algorithm that picks any valid word that does not violate the hints we get from the words we&apos;ve already played.
                    <br /><br /> The algorithm is non-trivial, but as an example, if we have already played &quot;table&quot; and &quot;weird&quot; for the hidden word &quot;peels&quot;, we won&apos;t play any more words with the letters &quot;tablwird&quot;, and we will only play words with e in the second position.
                    <br /><br /> Details of the algorithm can be found in the code, open-sourced on github.
                    <br /><br />
                </p>
                <Link href="/">
                    <a>Back</a>
                </Link>
            </div >
        </div>
    );
};

export default AboutPage;