"use client";

import { useState } from "react";

export default function TestPage() {

    const [walletUrl, setWalletUrl] = useState("");

    async function createPass() {

        const response = await fetch("/api/wallet/test", {
            method: "POST",
        });

        const data = await response.json();

        setWalletUrl(data.walletUrl);
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="flex flex-col gap-4 items-center">

                <button
                    onClick={createPass}
                    className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition cursor-pointer"
                >
                    Create Google Wallet Pass
                </button>

                {walletUrl && (
                    <a
                        href={walletUrl}
                        target="_blank"
                        className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-500 transition"
                    >
                        Add to Google Wallet
                    </a>
                )}

            </div>
        </main>
    );
}