import jwt from "jsonwebtoken";
import fs from "fs";

export interface MembershipObject {
    id: string,
    classId: string,

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
            value: "UMAnime Club Membership"
        }
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
            value: string
        }
    },

    textModulesData: [
        {
            id: "membership_id_#",
            header: "Membership ID #",
            body: string
        },
        {
            id: "affiliation",
            header: "Affiliation",
            body: string
        }
    ],

    barcode: {
        type: "QR_CODE",
        value: string
    },
}

const credentials = JSON.parse(
  fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS!, "utf8")
);

export function createGoogleWalletSaveUrl(walletObject: MembershipObject) {
  const claims = {
    iss: credentials.client_email,
    aud: "google",
    typ: "savetowallet",
    origins: ["https://anime.mikontrol.ca"],
    payload: {
      genericObjects: [walletObject],
    },
  };

  const token = jwt.sign(claims, credentials.private_key, {
    algorithm: "RS256",
  });

  return `https://pay.google.com/gp/v/save/${token}`;
}