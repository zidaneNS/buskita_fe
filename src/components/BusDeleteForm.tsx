import { deleteBus } from "@/lib/formAction";
import { Bus } from "@/lib/type";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { CiWarning } from "react-icons/ci";
import ErrorInputForm from "./ErrorInputForm";

export default function BusDeleteForm({ setIsDeleting, selectedBus }: { setIsDeleting: Dispatch<SetStateAction<boolean>>, selectedBus: Bus }) {
    const capacity = selectedBus.available_row * selectedBus.available_col + selectedBus.available_backseat;
    const identity = selectedBus.identity.padStart(2, '0');

    const deleteBusWithId = deleteBus.bind(null, undefined, selectedBus.id);
    const [state, action, pending] = useActionState(deleteBusWithId, undefined);

    useEffect(() => {
        if (state?.success) {
            if (state.success) setIsDeleting(false);
        }
    }, [state, setIsDeleting])
    return (
        <div className="max-h-3/4 flex flex-col gap-y-4 px-6 py-4 rounded-lg shadow-xl bg-white text-black items-center">
            <div className="flex justify-center items-center p-2 rounded-full bg-red-500/10 w-fit">
                <CiWarning className="size-12 text-red-500" />
            </div>
            <h1 className="text-xl font-semibold">Are you sure to delete this bus information ?</h1>
            <div className="grid grid-cols-2 gap-2 text-slate-600 w-full">
                <p className="border border-slate-600 px-4 py-2 rounded-md">identity: {identity}</p>
                <p className="border border-slate-600 px-4 py-2 rounded-md">Capacity: {capacity}</p>
                <p className="border border-slate-600 px-4 py-2 rounded-md">Total Rows: {selectedBus.available_row}</p>
                <p className="border border-slate-600 px-4 py-2 rounded-md">Total Columns: {selectedBus.available_col}</p>
                <p className="border border-slate-600 px-4 py-2 rounded-md">Total Backseats: {selectedBus.available_backseat}</p>
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