import { getUser } from "@/lib/dal";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await getUser();

    return NextResponse.json(user);
}