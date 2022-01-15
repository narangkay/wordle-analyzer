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
                <AccordionItemState>
                    {({ expanded }) => {
                        return (
                            <div className={`flex items-center text-3xl font-mono ${expanded ? "text-teal-500" : "text-white"}`}>
                                {expanded ? <HiChevronDown size={30} /> : <HiChevronRight size={30} />}
                                {props.result.word} (Rank #{props.result.rankBySuccessRate})
                            </div>
                        )
                    }}
                </AccordionItemState>
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
            <InitialWordCard result={props.result} standalone={false} />
        </AccordionItemPanel>
    </AccordionItem>);
};

class InitialWordsAccordian extends React.Component<{ results: StartingWord[] | undefined }, { filter: boolean }> {

    constructor(props: { results: StartingWord[] }) {
        super(props);
        this.state = { filter: true };
        // This binding is necessary to make `this` work in the callback
        this.handleSelection = this.handleSelection.bind(this);
    }


    async handleSelection(event: any) {
    }

    render() {
        if (!this.props.results) {
            return <div ></div>;
        }
        const items = this.props.results.sort(function (a, b) {
            return a.rankBySuccessRate - b.rankBySuccessRate;
        }).map(r => <SingleWord key={`${r.word}`} result={r}></SingleWord>);
        return (<Accordion allowZeroExpanded={true} className="w-full" id="initial-words-list">
            {items}
        </Accordion>);
    }
}

export default InitialWordsAccordian;