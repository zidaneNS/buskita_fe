'use client';

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function QrScanner() {
    const [success, setSuccess] = useState<string>("");
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                qrbox: {
                    height: 250,
                    width: 250
                },
                fps: 5
            },
            false
        );

        scanner.render(
            (decodedText: string) => {
                setSuccess(decodedText);
                scanner.clear();
            },
            (errorMessage: string) => {
               console.warn(errorMessage);
            }
        )
    }, []);

    return success ? 
    (
        <div className="text-xl font-semibold">{success}</div>
    ) :
    (
        <div id="reader" className="size-1/2"></div>
    )
}