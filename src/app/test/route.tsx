import {  cryptoDecrypt, cryptoEncrypt, generateAscii, generatePlain, m_digit, PRIVATE_KEY, PUBLIC_KEY } from "@/lib/crypto";
import { NextResponse } from "next/server";

export async function GET() {
    const text = generateAscii('Libur 10 hari', m_digit);
    const cipher = cryptoEncrypt(text, PUBLIC_KEY, m_digit)
    const plain = cryptoDecrypt(cipher, PRIVATE_KEY, m_digit);
    console.log(generatePlain(plain, m_digit));

    return NextResponse.json(text);
}