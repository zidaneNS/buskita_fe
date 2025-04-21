import ScheduleDetailPage from "@/ui/ScheduleDetailPage";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    return (
        <ScheduleDetailPage id={id} />
    )
}