import { verifyCo } from "@/lib/action";
import ScheduleDetailPage from "@/ui/ScheduleDetailPage";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const isCo = await verifyCo();
    return (
        <ScheduleDetailPage isCo={isCo} id={id} />
    )
}