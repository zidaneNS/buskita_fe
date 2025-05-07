import AddBusInputForm from "@/components/AddBusInputForm";
import { Dispatch, SetStateAction } from "react";

export default function AddBusSection({ setIsAdd }: { setIsAdd: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="flex flex-col shadow-xl bg-dark-purple rounded-xl max-h-3/4 overflow-y-auto scrollbar-thin px-6 py-4 gap-y-6">
            <h1 className="text-2xl font-semibold w-full text-center">Add Bus</h1>
            <form className="grid grid-cols-2 gap-x-2 gap-y-4 w-full">
                <AddBusInputForm name="identity" title="Identity" type="text" placeholder="08" />
                <AddBusInputForm name="available_row" title="Total Row" type="number" placeholder="Input total seat rows" minValue={1} />
                <AddBusInputForm name="available_col" title="Total Column" type="number" placeholder="Input total seat columns" minValue={1} />
                <AddBusInputForm name="available_backseat" title="Total Backseat" type="number" placeholder="Input total backseats" minValue={0} />
                <button className="py-2 w-full bg-purple-800 cursor-pointer rounded-md hover:bg-purple-600 duration-300">Create</button>
            </form>
            <button onClick={() => setIsAdd(false)} className="mt-auto py-2 w-full border border-white cursor-pointer rounded-md hover:bg-white hover:text-black hover:border-none duration-300">Cancel</button>
        </div>
    )
}