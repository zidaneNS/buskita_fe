import { use } from "react";
import BusListSection from "./BusListSection";
import { Bus } from "@/lib/type";

export default function BusListWrapper({ rawBuses }: { rawBuses: Promise<Bus [] | undefined>}) {
    const buses = use(rawBuses) || [];

    return buses.length > 0 ? <BusListSection buses={buses} /> : <div>No buses to display</div>
}