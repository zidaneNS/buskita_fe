import { getUser } from "@/lib/dal";
import DashboardHomeSection from "@/ui/DashboardHomeSection";

export default async function Page() {
    const user = await getUser();
    return (
        <main className="w-full h-screen overflow-y-auto scrollbar-thin px-8 py-6 md:px-12 md:py-10 pr-6">
            <DashboardHomeSection user={user!} />
        </main>
    )
}