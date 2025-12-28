import { deleteSchedule } from "@/lib/formAction"
import { Dispatch, SetStateAction, useActionState, useEffect } from "react"
import { CiWarning } from "react-icons/ci"
import ErrorInputForm from "./ErrorInputForm"
import { ScheduleCard } from "@/lib/type/schedule"

export default function DeleteScheduleForm({
    time,
    identity,
    schedule,
    setIsDeleting
}: {
    time: string,
    identity: string,
    schedule: ScheduleCard,
    setIsDeleting: Dispatch<SetStateAction<boolean>>
}) {
    const deleteScheduleWithId = deleteSchedule.bind(null, undefined, schedule.scheduleId);
    const [state, action, pending] = useActionState(deleteScheduleWithId, undefined);

    useEffect(() => {
        if (state?.success) {
            if (state.success) setIsDeleting(false);
        }
    }, [state, setIsDeleting])
    return (
        <div className="max-h-4/5 overflow-y-auto px-6 py-4 rounded-lg shadow-xl flex flex-col gap-y-6 bg-white text-black">
            <div className="flex justify-center w-full">
                <div className="flex justify-center items-center p-2 rounded-full bg-red-500/20">
                    <CiWarning className="size-12 text-red-500" />
                </div>
            </div>
            <h1 className="text-base md:text-xl w-full text-center font-semibold">Are you sure to delete this schedule</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600 w-full">
                <p className="border border-slate-600 md:px-4 md:py-2 p-2 rounded-md text-center">Time: {time}</p>
                <p className="border border-slate-600 md:px-4 md:py-2 p-2 rounded-md text-center">Bus Identity: {identity}</p>
                <p className="border border-slate-600 md:px-4 md:py-2 p-2 rounded-md text-center">Route: {schedule.route?.name}</p>
            </div>
            <form className="w-full" action={action}>
                {pending ? (
                    <div className="w-full text-center">Loading...</div>
                ) : (
                    <button className="py-2 rounded-md bg-red-500 cursor-pointer hover:bg-red-400 text-white duration-300 w-full">Delete</button>
                )}
                {state?.error && <ErrorInputForm errMsg={state.error} />}
            </form>
            <button onClick={() => setIsDeleting(false)} className="py-2 w-full rounded-md border border-gray-400 cursor-pointer hover:bg-gray-400 duration-300">Cancel</button>
        </div>
    )
}