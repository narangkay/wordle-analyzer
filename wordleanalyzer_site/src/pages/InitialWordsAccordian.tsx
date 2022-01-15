import { inferQueryResponse } from "@/pages/api/trpc/[trpc]";
import { StartingWord } from "@prisma/client";
import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState,
} from 'react-accessible-accordion';
import { HiChevronRight, HiChevronDown } from 'react-icons/hi'
import InitialWordCard from "./InitialWordCard";

type InitialWordResults = inferQueryResponse<"get-starting-words-results">;

const SingleWord: React.FC<{ result: StartingWord }> = (props) => {
    return (<AccordionItem className="border w-full" uuid={`id-${props.result.word}`}>
        <AccordionItemHeading>
            <AccordionItemButton className="capitalize w-full py-4 px-5 text-base text-left bg-gray-900 focus:outline-none">
                <div className="flex items-center text-3xl text-teal-500 font-mono">
                    <AccordionItemState>
                        {({ expanded }) => (expanded ? <HiChevronDown size={30} /> : <HiChevronRight size={30} />)}
                    </AccordionItemState>
                    {props.result.word} (Rank #{props.result.rankBySuccessRate})
                </div>
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
            <InitialWordCard result={props.result} standalone={false} />
        </AccordionItemPanel>
    </AccordionItem>);
};

const InitialWordsAccordian: React.FC<{
    results: StartingWord[] | undefined;
}> = (props) => {
    if (!props.results) {
        return <div ></div>;
    }
    const items = props.results.sort(function (a, b) {
        return a.rankBySuccessRate - b.rankBySuccessRate;
    }).map(r => <SingleWord key={`${r.word}`} result={r}></SingleWord>);
    return (<Accordion allowZeroExpanded={true} className="w-full" id="initial-words-list">
        {items}
    </Accordion>);
};

export default InitialWordsAccordian;