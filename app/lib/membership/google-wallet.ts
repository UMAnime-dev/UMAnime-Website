import { google } from "googleapis";
import jwt from "jsonwebtoken";

const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID!;
const classId = process.env.GOOGLE_WALLET_CLASS_ID!;

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: [
    "https://www.googleapis.com/auth/wallet_object.issuer"
  ],
});

const walletobjects = google.walletobjects({
  version: "v1",
  auth,
});

async function validateClass() {
  try {
    await walletobjects.genericclass.get({
      resourceId: classId,
    });

    return true
  } catch {
    return false
  }
}

export async function createMembership({membershipId, name, affiliation, barcodeValue, valid_until} : {membershipId: string, name: string, affiliation: string, barcodeValue: string, valid_until: string}) {
  
  const validatedClass = await validateClass();

  if (!validatedClass) {
    console.error("Class does not exist. Please create the class before creating an object.");
    return;
  }

  const objectId = `${issuerId}.member-${membershipId}`;

  try {
    await walletobjects.genericobject.get({
      resourceId: objectId,
    })
  } catch {
    await walletobjects.genericobject.insert({
      requestBody: {
        id: objectId,
        classId: classId,
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
            value: name
          }
        },

        textModulesData: [
          {
            id: "membership_id_#",
            header: "Membership ID #",
            body: membershipId
          },
          {
            id: "affiliation",
            header: "Affiliation",
            body: affiliation
          },
          {
            id: "valid_until",
            header: "Valid Until",
            body: valid_until
          }
        ],

        barcode: {
          type: "QR_CODE",
          value: barcodeValue
        },
      }
    })
  }

  const credentials = await auth.getCredentials();

  const token = jwt.sign(
    {
      iss: credentials.client_email,
      aud: "google",
      typ: "savetowallet",
      origins: [process.env.DOMAIN_LINK],
      payload: {
        genericObjects: [
          {
            id: objectId,
          },
        ],
      },
    },
    (credentials.private_key as string).replace(/\\n/g, "\n"),
    {
      algorithm: "RS256",
    }
  );

  return `https://pay.google.com/gp/v/save/${token}`;
}

// await createMembership({ membershipId: `${crypto.randomInt(1000000, 9999999)}`, name: "Ryann Pastolero", affiliation: "UMAnime Club", barcodeValue: "https://anime.mikontrol.ca" });