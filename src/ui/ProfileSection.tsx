import ProfileDetail from "@/components/ProfileDetail";
import { User } from "@/lib/type";

export default function ProfileSection({ user }: { user: User }) {
    return (
        <div className="flex flex-col gap-y-4 w-full min-h-full">
            <ProfileDetail attribute="NIM / NIP" value={user.nim_nip} />
            <ProfileDetail attribute="Name" value={user.name} />
            <ProfileDetail attribute="Email" value={user.email} />
            <ProfileDetail attribute="Address" value={user.address} />
            <ProfileDetail attribute="Phone" value={user.phone_number} />
            <ProfileDetail attribute="Credit Score" value={user.credit_score} />
            <ProfileDetail attribute="Role" value={user.role_name} />
        </div>
    )
}