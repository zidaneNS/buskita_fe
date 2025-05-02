import ScheduleListSection from "@/ui/ScheduleListSection";

export default function Page() {
    return (
        <main className="flex flex-col h-screen w-full">
            <section className="flex flex-col gap-y-6 md:px-6 md:py-8 px-4 py-6 shadow-xl bg-black/30">
                <h1 className="text-2xl font-semibold w-full text-center">Add Schedule</h1>
                <form className="flex flex-col gap-y-4 md:flex-row md:gap-x-6 w-full">
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="time" className="text-base md:text-lg font-semibold">Time :</label>
                        <input id="time" name="time" type="datetime-local" className="text-sm md:text-base bg-white text-black px-4 py-2 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="bus" className="text-base md:text-lg font-semibold">Bus :</label>
                        <select id="bus" name="bus" className="text-sm md:text-base bg-white text-black px-4 py-2 rounded-md cursor-pointer">
                            <option value="">Select Bus</option>
                            <option value="">01</option>
                            <option value="">08</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="bus" className="text-base md:text-lg font-semibold">Route :</label>
                        <select id="bus" name="bus" className="text-sm md:text-base bg-white text-black px-4 py-2 rounded-md cursor-pointer">
                            <option value="">Select Route</option>
                            <option value="">GSK-SBY</option>
                            <option value="">SBY-GSK</option>
                        </select>
                    </div>
                </form>
                <button className="py-2 w-full bg-purple-800 cursor-pointer rounded-md hover:bg-purple-600 duration-300">Create</button>
            </section>
            <section className="flex w-full px-4 py-2 md:px-12 md:py-10 h-full overflow-y-auto scrollbar-thin mb-3">
                <ScheduleListSection />
            </section>
        </main>
    )
}