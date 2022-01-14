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
            <AccordionItemButton className="capitalize w-full py-4 px-5 text-base text-white text-left bg-gray-900 focus:outline-none">
                <div className="flex items-center">
                    <AccordionItemState>
                        {({ expanded }) => (expanded ? <HiChevronDown size={25} /> : <HiChevronRight size={25} />)}
                    </AccordionItemState>
                    {props.result.word}
                </div>
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
            <InitialWordCard result={props.result} />
        </AccordionItemPanel>
    </AccordionItem>);
};

const InitialWordsAccordian: React.FC<{
    results: StartingWord[] | undefined;
}> = (props) => {
    if (!props.results) {
        return <div ></div>;
    }
    const items = props.results.map(r => <SingleWord key={`${r.word}`} result={r}></SingleWord>);
    return (<Accordion allowZeroExpanded={true} className="w-full" id="initial-words-list">
        {items}
    </Accordion>);
};

export default InitialWordsAccordian;