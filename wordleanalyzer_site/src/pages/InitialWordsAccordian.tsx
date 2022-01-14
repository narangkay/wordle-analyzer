import { inferQueryResponse } from "@/pages/api/trpc/[trpc]";
import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

type InitialWordResults = inferQueryResponse<"get-starting-words-stats">;

const SingleWord: React.FC<{ word: string }> = (props) => {
    return (<AccordionItem className="border w-full" uuid={`${props.word}`}>
        <AccordionItemHeading className="mb-0" id={`id-${props.word}`}>
            <AccordionItemButton
                className="collapsed relative capitalize flex items-center w-full py-4 px-5 text-base text-white text-left bg-gray-700 border-0 rounded-none transition focus:outline-none"
                data-bs-toggle="collapse"
                data-bs-target={`#id-collapse-${props.word}`}
                aria-expanded="true"
                aria-controls={`id-collapse-${props.word}`}
            >
                {props.word}
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel
            id={`id-collapse-${props.word}`}
            className="accordion-collapse collapse"
            aria-labelledby={`id-${props.word}`}
            data-bs-parent="#initial-words-list"
        >
            <div className="accordion-body py-4 px-5">
                <strong>This is the first items accordion body.</strong> It is shown by default,
                until the collapse plugin adds the appropriate classes that we use to style each
                element. These classes control the overall appearance, as well as the showing and
                hiding via CSS transitions. You can modify any of this with custom CSS or overriding
                our default variables. Its also worth noting that just about any HTML can go within
                the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
        </AccordionItemPanel>
    </AccordionItem>);
};

const InitialWordsAccordian: React.FC<{
    results: InitialWordResults | undefined;
}> = (props) => {
    if (!props.results) {
        return <div ></div>;
    }
    const items = props.results.results.map(word => <SingleWord key={`${word}`} word={`${word}`}></SingleWord>);
    return (<Accordion allowZeroExpanded={true} className="w-full" id="initial-words-list">
        {items}
    </Accordion>);
};

export default InitialWordsAccordian;