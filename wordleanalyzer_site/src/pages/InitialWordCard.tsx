import { StartingWord } from "@prisma/client";
import React from 'react';
import ReactHover, { Trigger, Hover } from "react-hover";
import { IconContext } from "react-icons";
import { AiOutlineInfoCircle } from 'react-icons/ai'

function percentileNum(rank: number, total: number) {
    return Math.round(rank * 100 / total);
}

function percentileNumSnapped(rank: number, total: number) {
    const p = percentileNum(rank, total);
    let percentiles = [1, 2, 5, 10, 15, 20, 25, 35]
    for (var perc of percentiles) {
        if (p < perc) {
            return perc;
        }
    }
    percentiles = percentiles.reverse();
    for (var perc of percentiles) {
        if (p > (100 - perc)) {
            return 100 - perc;
        }
    }
    return 50;
}

function percentile(rank: number, total: number, suffix: string) {
    const p = percentileNumSnapped(rank, total)
    if (p > 50) {
        return (<div>
            In the bottom {(100 - p)} percent of words {suffix}
        </div>)
    }
    if (p < 50) {
        return (<div>
            In the top {p} percent of words {suffix}
        </div>)
    }
    return (<div>
        More or less the median word {suffix}
    </div>)
}
const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0
};

function wrapWithInfo(el: {}, hoverText: string) {
    return (<IconContext.Provider
        value={{ color: 'teal', size: '20px' }}
    >
        <div className="flex items-center py-4 px-5">
            {el}
            <div className="px-1"></div>
            <ReactHover options={optionsCursorTrueWithMargin}>
                <Trigger type="trigger">
                    <AiOutlineInfoCircle />
                </Trigger>
                <Hover type="hover">
                    <h1 className="text text-black"> {hoverText} </h1>
                </Hover>
            </ReactHover>
        </div>
    </IconContext.Provider>)
}

function percentileWithInfo(rank: number, total: number, suffix: string) {
    const perc = percentile(rank, total, suffix)
    return wrapWithInfo(perc, "Rank " + rank + " of " + total)
}

const InitialWordCard: React.FC<{
    result: StartingWord | StartingWord[] | undefined, standalone: boolean
}> = (props) => {
    if (!props.result) {
        return null;
    }
    if (Array.isArray(props.result) && props.result.length == 0) {
        return (
            <div>Not found :(</div>
        )
    }
    let result: StartingWord;
    if (Array.isArray(props.result)) {
        result = props.result[0]
    } else {
        result = props.result
    }
    const totalWords = result.numGuessed + result.numNotGuessed;
    const percentileBySuccessRate = percentileWithInfo(result.rankBySuccessRate, totalWords, "by success rate");
    const percentileByGuessesNeeded = percentileWithInfo(result.rankByGuessesNeeded, totalWords, "by number of guesses required")
    const percentileWordsGuessed = wrapWithInfo((<div>Can successfully guess {percentileNum(result.numGuessed, totalWords)} percent of hidden words</div>), result.numGuessed + " out of " + totalWords)
    return (
        <div className={`p-2 text-2xl flex flex-col  w-full bg-gray-700 ${props.standalone ? "max-w-4xl border-white border rounded" : ""}`}>
            {props.standalone ? <div className="capitalize text-4xl text-teal-500 font-mono">{result.word}</div> : null}
            {percentileWordsGuessed}
            {percentileBySuccessRate}
            <div className="py-4 px-5">
                Requires {Math.round(result.avgGuesses * 100) / 100} guesses to get at the hidden word on average
            </div>
            {percentileByGuessesNeeded}
        </div >);
};

export default InitialWordCard;