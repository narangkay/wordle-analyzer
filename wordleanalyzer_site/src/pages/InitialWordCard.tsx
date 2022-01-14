import { StartingWord } from "@prisma/client";
import React from 'react';

const InitialWordCard: React.FC<{
    result: StartingWord | StartingWord[] | undefined
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
    return (
        <div>
            <div className="py-4 px-5">
                {result.avgGuesses}
            </div>
            <div className="py-4 px-5">
                {result.numGuessed}
            </div>
            <div className="py-4 px-5">
                {result.numNotGuessed}
            </div>
            {/* <div className="py-4 px-5">
                {result.rankByGuessesNeeded}
            </div> */}
            <div className="py-4 px-5">
                {result.rankBySuccessRate}
            </div>
        </div>);
};

export default InitialWordCard;