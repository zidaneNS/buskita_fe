import { NextResponse } from "next/server";

export function GET() {
    const baseUrl = process.env.BASE_URL;

    return NextResponse.json(baseUrl);
}