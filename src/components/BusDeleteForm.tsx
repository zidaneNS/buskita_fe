import { deleteBus } from "@/lib/formAction";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { CiWarning } from "react-icons/ci";
import ErrorInputForm from "./ErrorInputForm";
import { Bus } from "@/lib/type/bus";

export default function BusDeleteForm({ setIsDeleting, selectedBus }: { setIsDeleting: Dispatch<SetStateAction<boolean>>, selectedBus: Bus }) {
    const capacity = selectedBus.totalRow * selectedBus.totalCol + selectedBus.totalBackseat;
    const identity = selectedBus.name.padStart(2, '0');

    const deleteBusWithId = deleteBus.bind(null, undefined, selectedBus.busId);
    const [state, action, pending] = useActionState(deleteBusWithId, undefined);

    useEffect(() => {
        if (state?.success) {
            if (state.success) setIsDeleting(false);
        }
    }, [state, setIsDeleting])
    return (
        <div className="max-h-3/4 max-w-3/4 md:max-w-full flex flex-col gap-y-4 px-4 py-2 md:px-6 md:py-4 rounded-lg shadow-xl bg-white text-black items-center">
            <div className="flex justify-center items-center p-2 rounded-full bg-red-500/10 w-fit">
                <CiWarning className="size-8 md:size-12 text-red-500" />
            </div>
            <h1 className="text-base md:text-xl w-full text-center font-semibold">Are you sure to delete this bus</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600 w-full">
                <p className="border border-slate-600 md:px-4 md:py-2 p-2 rounded-md text-center">identity: {identity}</p>
                <p className="border border-slate-600 md:px-4 md:py-2 p-2 rounded-md text-center">Capacity: {capacity}</p>
                <p className="border border-slate-600 md:px-4 md:py-2 p-2 rounded-md text-center">Total Rows: {selectedBus.totalRow}</p>
                <p className="border border-slate-600 md:px-4 md:py-2 p-2 rounded-md text-center">Total Columns: {selectedBus.totalCol}</p>
                <p className="border border-slate-600 md:px-4 md:py-2 p-2 rounded-md text-center">Total Backseats: {selectedBus.totalBackseat}</p>
            </div>
            <form className="w-full" action={action}>
                {pending ? (
                    <div className="w-full text-center">Loading...</div>
                ) : (
                    <button className="py-2 rounded-md bg-red-500 cursor-pointer hover:bg-red-400 text-white duration-300 w-full">Delete</button>
                )}
                {state?.error && <ErrorInputForm errMsg={state.error} />}
            </form>
            <button onClick={() => setIsDeleting(false)} className="py-2 rounded-md border border-slate-700 cursor-pointer hover:bg-slate-700 hover:text-white duration-300 w-full">Cancel</button>
        </div>
    )
}