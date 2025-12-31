import DropDown from "@/components/DropDown";
import { encrypt, getUserSeatWithSchedule } from "@/lib/action";
import { getUser } from "@/lib/dal";
import { dummyDates, dummyRoutes } from "@/lib/dummyData"
import { Bus, EncryptedSeat, Plaintext, ScheduleCard, Seat } from "@/lib/type";
import MyScheduleSection from "@/ui/MyScheduleSection";
import { Suspense } from "react";

export default async function Page() {
    const routes = dummyRoutes;
    const dates = dummyDates;

    const user = await getUser();
    const seats = await getUserSeatWithSchedule() || [];

    const encryptedSeats: EncryptedSeat[] = await Promise.all(seats.map(async (seat: Seat) => {
        const plaintext: Plaintext = {
            time: seat.schedule?.time || new Date(),
            seatId: seat.seatId,
            busName: seat.bus?.name || '',
            name: user?.name || '',
            userId: user?.userId || '',
            seatNumber: seat.seatNumber,
            scheduleId: seat.scheduleId
        }

        console.log(JSON.stringify(plaintext));

        const res = await encrypt(JSON.stringify(plaintext));
        return ({
            ...seat,
            ciphertext: res.payloads?.data || ''
        })
    }));

    return (
        <main className="flex flex-col gap-y-4 px-6 md:px-32 pt-24 md:pt-32 pb-10 w-full min-h-screen">
            <h1 className="w-full text-xl md:text-3xl font-semibold py-4 md:py-6 border-b border-white">My Schedule</h1>
            <section className="w-full flex flex-col gap-y-4">
                <p className="text-sm md:text-base font-semibold">Filter</p>
                <div className="w-full md:w-1/3 flex justify-center gap-x-8">
                    <DropDown items={routes} />
                    <DropDown items={dates} />
                </div>
                <div className="h-[90vh] w-full overflow-y-auto pr-4 scrollbar-thin scrollbar-track-gradient-end/70 scrollbar-thumb-midnight-purple pt-4">
                    <Suspense fallback={<div>Loading...</div>}>
                        <MyScheduleSection seats={encryptedSeats} user={user!} />
                    </Suspense>
                </div>
            </section>
        </main>
    )
}