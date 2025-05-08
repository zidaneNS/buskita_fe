import { Bus } from "@/lib/type";
import { Dispatch, SetStateAction } from "react";
import AddBusInputForm from "./AddBusInputForm";
import { displaySeats } from "@/lib/helper";

export default function BusEditForm({ selectedBus, setIsEditing }: { selectedBus: Bus, setIsEditing: Dispatch<SetStateAction<boolean>> }) {
    const row = selectedBus.available_row;
    const col = selectedBus.available_col;
    const backseat = selectedBus.available_backseat;
    const capacity =  row * col + backseat;

    const colStarts = displaySeats(capacity, row, col, backseat);
    return (
        <div className="max-h-3/4 flex flex-col gap-y-4 py-4 px-6 rounded-lg bg-dark-purple shadow-xl">
            <div className="flex items-center gap-x-8">
                <form className="flex flex-col gap-y-4">
                    <h1 className="text-xl font-semibold">Edit Bus Information</h1>
                    <div className="flex flex-col gap-y-2">
                        <AddBusInputForm name="identity" type="text" title="Identity" placeholder="07" />
                        <AddBusInputForm name="available_row" type="number" title="Total Rows" placeholder="Input number of rows" minValue={1} />
                        <AddBusInputForm name="available_col" type="number" title="Total Columns" placeholder="Input number of columns" minValue={1} />
                        <AddBusInputForm name="available_backseat" type="number" title="Total Backseats" placeholder="Input number of backseats" minValue={0} />
                    </div>
                    <button className="w-full py-2 rounded-md bg-midnight-purple cursor-pointer hover:bg-white hover:text-black duration-300">Edit</button>
                </form>
                <div className={`grid grid-cols-${selectedBus.available_backseat} gap-2`}>
                    {colStarts.map((colStart, i) => (
                        <div key={i} className={`size-8 bg-slate-200 cursor-pointer text-black text-sm text-center rounded-md col-start-${colStart}`}></div>
                    ))}
                </div>
            </div>
            <button onClick={() => setIsEditing(false)} className="w-full py-2 rounded-md border border-slate-500 cursor-pointer hover:bg-slate-500 duration-300">Cancel</button>
        </div>
    )
}