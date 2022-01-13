import 'tw-elements';
import { inferQueryResponse } from "@/pages/api/trpc/[trpc]";


type InitialWordResults = inferQueryResponse<"get-starting-words-stats">;

const SingleWord: React.FC<{ word: string }> = (props) => {
    return (<div className="accordion-item border w-full">
        <h2 className="accordion-header mb-0" id={`id-${props.word}`}>
            <button
                className="accordion-button collapsed relative capitalize flex items-center w-full py-4 px-5 text-base text-white text-left bg-gray-700 border-0 rounded-none transition focus:outline-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#id-collapse-${props.word}`}
                aria-expanded="true"
                aria-controls={`id-collapse-${props.word}`}
            >
                {props.word}
            </button>
        </h2>
        <div
            id={`id-collapse-${props.word}`}
            className="accordion-collapse collapse"
            aria-labelledby={`id-${props.word}`}
            data-bs-parent="#initial-words-list"
        >
            <div className="accordion-body py-4 px-5">
                <strong>This is the first item's accordion body.</strong> It is shown by default,
                until the collapse plugin adds the appropriate classes that we use to style each
                element. These classes control the overall appearance, as well as the showing and
                hiding via CSS transitions. You can modify any of this with custom CSS or overriding
                our default variables. It's also worth noting that just about any HTML can go within
                the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
        </div>
    </div>);
};

const InitialWordsAccordian: React.FC<{
    results: InitialWordResults | undefined;
}> = (props) => {
    if (!props.results) {
        return <div ></div>;
    }
    const items = props.results.results.map(word => <SingleWord word={`${word}`}></SingleWord>);
    return (<div className="accordion w-full" id="initial-words-list">
        {items}
    </div>);
};

export default InitialWordsAccordian;