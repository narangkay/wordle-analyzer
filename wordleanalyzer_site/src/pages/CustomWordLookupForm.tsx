import { trpc } from "@/utils/trpc"
import { StartingWord } from "@prisma/client";
import { TRPCClientErrorLike } from "@trpc/client";
import { DefaultErrorShape } from "@trpc/server";
import { Procedure } from "@trpc/server/dist/declarations/src/internals/procedure";
import { Router } from "@trpc/server/dist/declarations/src/router";
import React from 'react';
import { UseMutationResult } from "react-query";
import InitialWordCard from "./InitialWordCard";

class CustomWordLookupForm extends React.Component<{ setEnableSearch: React.Dispatch<React.SetStateAction<boolean>>, setWordToSearch: React.Dispatch<React.SetStateAction<string>>, searchResults: StartingWord[] | undefined }, { textInput: string }> {

    constructor(props: { setEnableSearch: React.Dispatch<React.SetStateAction<boolean>>, setWordToSearch: React.Dispatch<React.SetStateAction<string>>, searchResults: StartingWord[] | undefined }) {
        super(props);
        this.state = { textInput: "" };
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    async handleClick(event: any) {
        event.preventDefault();
        if (this.state.textInput.length == 5) {
            this.props.setWordToSearch(this.state.textInput)
            this.props.setEnableSearch(true);
        }
    }

    handleChange(event: any) {
        this.setState(prevState => ({ ...prevState, textInput: event.target.value }));
    }

    render() {
        //Need to call this hook here per react rules
        return (<div className="w-screen flex flex-col h-screen justify-start items-center">
            <div className="text-4xl text-center">How good is your Wordle starting word?</div>
            <form className="w-full max-w-xs" onSubmit={this.handleClick}>
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input onChange={this.handleChange} className="text-6xl  appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="table" aria-label="free text" />
                    <button
                        disabled={this.state.textInput.length != 5}
                        onClick={this.handleClick}
                        className={`${this.state.textInput.length == 5 ?
                            "bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700" : "bg-gray-500 border-gray-500"
                            } flex-shrink-0 text-2xl border-4 text-white py-1 px-2 rounded`} type="button">
                        Search!
                    </button>
                </div>
            </form >
            <div className='p-2'></div>
            <InitialWordCard result={this.props.searchResults} standalone />
        </div >);
    }
};

export default CustomWordLookupForm;