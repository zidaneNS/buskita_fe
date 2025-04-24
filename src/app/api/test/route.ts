import { test } from "@/lib/action";
import { dummyPassenger } from "@/lib/dummyData";
import { User } from "@/lib/type";
import { NextResponse } from "next/server";

export async function GET() {
    const user: User = dummyPassenger;

    await test(JSON.stringify(user));
    return NextResponse.json({ user: JSON.stringify(user) });
}