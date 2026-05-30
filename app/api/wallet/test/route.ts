import { NextResponse } from "next/server";

import { createGoogleWalletSaveUrl, MembershipObject } from "@/app/lib/membership/membership-object";

export async function POST() {

    const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID!;

    const walletObject: MembershipObject = {
        id: `${issuerId}.test-member-3`,
        classId: `${issuerId}.membership`,
        state: "ACTIVE",

        logo: {
            sourceUri: {
                uri: "https://anime.mikontrol.ca/Logo.png"
            },
            contentDescription: {
                defaultValue: {
                    language: "en-US",
                    value: "LOGO_IMAGE_DESCRIPTION"
                }
            }
        },

        cardTitle: {
            defaultValue: {
                language: "en-US",
                value: "UMAnime Club Membership",
            },
        },

        subheader: {
            defaultValue: {
                language: "en-US",
                value: "Membership Holder"
            }
        },

        header: {
            defaultValue: {
                language: "en-US",
                value: "Ryann Pastolero"
            }
        },

        textModulesData: [
            {
                id: "membership_id_#",
                header: "Membership ID #",
                body: "67"
            },
            {
                id: "affiliation",
                header: "Affiliation",
                body: "EXTERNAL"
            }
        ],

        barcode: {
            type: "QR_CODE",
            value: "https://anime.mikontrol.ca",
        },
    };

    const walletUrl = createGoogleWalletSaveUrl(walletObject);

    return NextResponse.json({
        walletUrl,
    });
}