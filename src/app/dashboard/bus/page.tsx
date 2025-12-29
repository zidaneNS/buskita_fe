import { getAllBuses } from "@/lib/action";
import BusHeadPage from "@/ui/BusHeadPage";
import BusListWrapper from "@/ui/BusListWrapper";
import { Suspense } from "react";

export default function Page() {
    const rawBuses = getAllBuses();
    return (
        <main className="flex flex-col h-screen w-full px-8 py-6 md:px-10 md:py-8 gap-y-4">
            <BusHeadPage />
            <Suspense fallback={<div>Loading...</div>}>
                <BusListWrapper rawBuses={rawBuses} />
            </Suspense>
        </main>
    )
}