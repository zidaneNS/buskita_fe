'use client';

import { createSchedule } from "@/lib/formAction";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import ErrorInputForm from "./ErrorInputForm";
import { Bus } from "@/lib/type";
import { Route } from "@/lib/type";

export default function CreateScheduleForm({ buses, routes, setIsCreating }: { buses: Bus[], routes: Route[], setIsCreating: Dispatch<SetStateAction<boolean>> }) {
    const [state, action, pending] = useActionState(createSchedule, undefined);

    useEffect(() => {
        if (state?.success) {
            if (state.success) setIsCreating(false)
        }
    }, [state, setIsCreating])
    return (
        <form action={action} className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-2">
                <label htmlFor="time" className="text-sm font-semibold">Time</label>
                <input type="datetime-local" name="time" id="time" className="px-4 py-2 rounded-md bg-white text-black" />
                {state?.errors?.time && <ErrorInputForm errMsg={state.errors.time} />}
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="bus_id" className="text-sm font-semibold">Bus</label>
                <select name="bus_id" id="bus_id" className="px-4 py-2 rounded-md bg-white text-black">
                    <option value="">Select a bus</option>
                    {buses.map((bus, i) => {
                        const identity = bus.name.padStart(2, '0');
                        const capacity = bus.totalRow * bus.totalCol + bus.totalBackseat;

                        return (
                            <option value={bus.busId} key={i}>Bus: {identity} | Capacity: {capacity}</option>
                        )
                    })}
                </select>
                {state?.errors?.bus_id && <ErrorInputForm errMsg={state.errors.bus_id} />}
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="route_id" className="text-sm font-semibold">Route</label>
                <select name="route_id" id="route_id" className="px-4 py-2 rounded-md bg-white text-black">
                    <option value="">Select a route</option>
                    {routes.map((route, i) => (
                        <option value={route.routeId} key={i}>{route.name}</option>
                    ))}
                </select>
                {state?.errors?.route_id && <ErrorInputForm errMsg={state.errors.route_id} />}
            </div>
            {state?.error && <ErrorInputForm errMsg={state.error} />}
            {pending ? (
                <div className="w-full text-center">Loading</div>
            ) : (
                <button className="py-2 rounded-md w-full cursor-pointer bg-midnight-purple hover:bg-white hover:text-black duration-300">Create Schedule</button>
            )}
        </form>
    )
}