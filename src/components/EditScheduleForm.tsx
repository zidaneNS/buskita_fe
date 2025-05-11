'use client';

import { Bus, RouteType, Schedule } from "@/lib/type";
import ErrorInputForm from "./ErrorInputForm";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { editSchedule } from "@/lib/formAction";

export default function EditScheduleForm({
    routes,
    buses,
    schedule,
    setIsEditing
}: {
    routes: RouteType[],
    buses: Bus[],
    schedule: Schedule,
    setIsEditing: Dispatch<SetStateAction<boolean>>
}) {
    const [state, action, pending] = useActionState(editSchedule, undefined);

    useEffect(() => {
        if (state?.success) {
            if (state.success) setIsEditing(false)
        }
    }, [state, setIsEditing])

    function toLocalDateTimeInputValue(dateString: string) {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().slice(0, 16);
    }
    
    const defaultBus = buses.filter(bus => bus.identity === schedule.bus_identity)[0];
    const defaultRoute = routes.filter(route => route.route_name === schedule.route_name)[0];
    return (
        <form action={action} className="flex flex-col gap-y-3">
            <input type="hidden" name="id" value={schedule.id} />
            <div className="flex flex-col gap-y-2">
                <label htmlFor="time" className="text-sm font-semibold">Time</label>
                <input type="datetime-local" defaultValue={toLocalDateTimeInputValue(schedule.time.toString())} name="time" id="time" className="px-4 py-2 rounded-md bg-white text-black" />
                {state?.errors?.time && <ErrorInputForm errMsg={state.errors.time} />}
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="bus_id" className="text-sm font-semibold">Bus</label>
                <select defaultValue={defaultBus.id} name="bus_id" id="bus_id" className="px-4 py-2 rounded-md bg-white text-black">
                    <option value="">Select a bus</option>
                    {buses.map((bus, i) => {
                        const identity = bus.identity.padStart(2, '0');
                        const capacity = bus.available_row * bus.available_col + bus.available_backseat;

                        return (
                            <option value={bus.id} key={i}>Bus: {identity} | Capacity: {capacity}</option>
                        )
                    })}
                </select>
                {state?.errors?.bus_id && <ErrorInputForm errMsg={state.errors.bus_id} />}
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="route_id" className="text-sm font-semibold">Route</label>
                <select defaultValue={defaultRoute.id} name="route_id" id="route_id" className="px-4 py-2 rounded-md bg-white text-black">
                    <option value="">Select a route</option>
                    {routes.map((route, i) => (
                        <option value={route.id} key={i}>{route.route_name}</option>
                    ))}
                </select>
                {state?.errors?.route_id && <ErrorInputForm errMsg={state.errors.route_id} />}
            </div>
            <div className="flex gap-x-3 items-center py-4 w-fit px-2 border border-white/30 rounded-md">
                <label htmlFor="closed" className="text-sm font-semibold">Closed</label>
                <input defaultChecked={schedule.closed} type="checkbox" name="closed" id="closed" />
            </div>
            {state?.errors?.closed && <ErrorInputForm errMsg={state.errors.closed} />}
            {state?.error && <ErrorInputForm errMsg={state.error} />}
            {pending ? (
                <div className="w-full text-center">Loading</div>
            ) : (
                <button className="py-2 rounded-md w-full cursor-pointer bg-midnight-purple hover:bg-white hover:text-black duration-300">Update</button>
            )}
        </form>
    )
}