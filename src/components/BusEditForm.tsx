import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import AddBusInputForm from "./AddBusInputForm";
import { changeBus } from "@/lib/formAction";
import ErrorInputForm from "./ErrorInputForm";
import { Bus } from "@/lib/type/bus";

export default function BusEditForm({ selectedBus, setIsEditing }: { selectedBus: Bus, setIsEditing: Dispatch<SetStateAction<boolean>> }) {
    const row = selectedBus.totalRow;
    const col = selectedBus.totalCol;
    const backseat = selectedBus.totalBackseat;
    const capacity =  row * col + backseat;

    const [state, action, pending] = useActionState(changeBus, undefined);

    useEffect(() => {
        if (state?.success) {
            if (state.success) setIsEditing(false);
        }
    }, [state, setIsEditing]);
    return (
        <div className="max-h-4/5 max-w-6/7 md:w-fit flex flex-col gap-y-4 p-4 md:py-4 md:px-6 rounded-lg bg-dark-purple shadow-xl overflow-auto scrollbar-thin">
            <h1 className="w-full text-center text-lg md:text-2xl font-bold">Bus Information</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-y-6 md:gap-x-8">
                <form action={action} className="flex flex-col gap-y-3">
                    <input type="hidden" name="id" value={selectedBus.busId.toString()} />
                    <div className="flex flex-col gap-y-2">
                        <AddBusInputForm value={selectedBus.name} name="identity" type="text" title="Identity" placeholder="07">
                            {state?.errors?.identity && <ErrorInputForm errMsg={state.errors.identity} />}
                        </AddBusInputForm>
                        <AddBusInputForm value={selectedBus.totalRow} name="available_row" type="number" title="Total Rows" placeholder="Input number of rows" minValue={1}>
                            {state?.errors?.available_row && <ErrorInputForm errMsg={state.errors.available_row} />}
                        </AddBusInputForm>
                        <AddBusInputForm value={selectedBus.totalCol} name="available_col" type="number" title="Total Columns" placeholder="Input number of columns" minValue={1}>
                            {state?.errors?.available_col && <ErrorInputForm errMsg={state.errors.available_col} />}
                        </AddBusInputForm>
                        <AddBusInputForm value={selectedBus.totalBackseat} name="available_backseat" type="number" title="Total Backseats" placeholder="Input number of backseats" minValue={0}>
                            {state?.errors?.available_backseat && <ErrorInputForm errMsg={state.errors.available_backseat} />}
                        </AddBusInputForm>
                        {state?.error && <ErrorInputForm errMsg={state.error} />}
                    </div>
                    { pending ? (
                        <div className="w-full text-center">Loading</div>
                    ) : (
                        <button className="w-full py-2 rounded-md bg-midnight-purple cursor-pointer hover:bg-white hover:text-black duration-300">Edit</button>
                    )}
                </form>
                <div className={`grid grid-cols-${selectedBus.totalBackseat.toString()} gap-2 px-4`}>
                    {Array.from({ length: capacity }).map((_, i) => {
                        const index = i + 1;
                        let colStart = index;
                        if (index <= col * row) {
                            for (let j = 1; j <= col; j++) {
                                if (j <= col/2) {
                                    if (index % col === j) {
                                        colStart = j;
                                        break;
                                    }
                                } else if (j > col/2 && j < col) {
                                    if (index % col === j) {
                                        colStart = j + backseat - col;
                                        break;
                                    }
                                } else {
                                    if (index % col === 0) {
                                        colStart = backseat;
                                        break;
                                    }
                                }
                            }
                        }
                        return (
                            <div key={i} className={`size-8 bg-slate-200 cursor-pointer rounded-md col-start-${colStart}`}></div>
                        )
                    })}
                </div>
            </div>
            <button onClick={() => setIsEditing(false)} className="w-full py-2 rounded-md border border-slate-500 cursor-pointer hover:bg-slate-500 duration-300">Cancel</button>
        </div>
    )
}