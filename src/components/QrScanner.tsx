'use client';

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

export default function QrScanner() {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: 250 },
            false
        );

        scanner.render(
            (decodedText: string) => {
                alert(`scanned ${decodedText}`);
                scanner.clear();
            },
            (errorMessage: string) => {
               console.warn(errorMessage);
            }
        )
    }, []);

    return (
        <div id="reader" className="size-1/2"></div>
    )
}