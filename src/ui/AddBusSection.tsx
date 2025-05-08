'use client';

import AddBusInputForm from "@/components/AddBusInputForm";
import ErrorInputForm from "@/components/ErrorInputForm";
import { addBus } from "@/lib/formAction";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";

export default function AddBusSection({ setIsAdd }: { setIsAdd: Dispatch<SetStateAction<boolean>> }) {
    const [state, action, pending] = useActionState(addBus, undefined);
    useEffect(() => {
        if (state?.success) {
            if (state.success) setIsAdd(false);
        }
    }, [state, setIsAdd])
    return (
        <div className="flex flex-col shadow-xl bg-dark-purple rounded-xl max-h-3/4 overflow-y-auto scrollbar-thin px-6 py-4 gap-y-6">
            <h1 className="text-2xl font-semibold w-full text-center">Add Bus</h1>
            <form action={action} className="grid grid-cols-2 gap-x-2 gap-y-4 w-full">
                <AddBusInputForm name="identity" title="Identity" type="text" placeholder="08">
                    {state?.errors?.identity && <ErrorInputForm errMsg={state.errors.identity} />}
                </AddBusInputForm>
                <AddBusInputForm name="available_row" title="Total Row" type="number" placeholder="Input total seat rows" minValue={1}>
                    {state?.errors?.available_row && <ErrorInputForm errMsg={state.errors.available_row} />}
                </AddBusInputForm>
                <AddBusInputForm name="available_col" title="Total Column" type="number" placeholder="Input total seat columns" minValue={1}>
                    {state?.errors?.available_col && <ErrorInputForm errMsg={state.errors.available_col} />}
                </AddBusInputForm>
                <AddBusInputForm name="available_backseat" title="Total Backseat" type="number" placeholder="Input total backseats" >
                    {state?.errors?.available_backseat && <ErrorInputForm errMsg={state.errors.available_backseat} />}
                </AddBusInputForm>
                {state?.error && <ErrorInputForm errMsg={state.error} />}
                {pending ? (
                    <div className="col-span-2 text-center">Loading...</div>
                ) : (
                    <button className="col-span-2 py-2 w-full bg-purple-800 cursor-pointer rounded-md hover:bg-purple-600 duration-300">Create</button>
                )}
            </form>
            <button onClick={() => setIsAdd(false)} className="mt-auto py-2 w-full border border-white cursor-pointer rounded-md hover:bg-white hover:text-black hover:border-none duration-300">Cancel</button>
        </div>
    )
}