import "dotenv/config";
import { GoogleAuth } from "google-auth-library";

const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID;

const classSuffix = "membership";
const classId = `${issuerId}.${classSuffix}`;

export const walletClass = {
  id: classId,
  issuerName: "UMAnime Club",
  reviewStatus: "UNDER_REVIEW",

  cardTitle: {
    defaultValue: {
      language: "en-US",
      value: "UMAnime Club Membership",
    },
  },

  subheader: {
    defaultValue: {
      language: "en-US",
      value: "Membership Holder",
    },
  },
};

export async function createClass() {
  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/wallet_object.issuer"],
  });

  const client = await auth.getClient();

  const getClass = await client.request({
    url: `https://walletobjects.googleapis.com/walletobjects/v1/genericClass/${classId}`,
    method: "GET",
  });

  if (getClass.status != 200) {
    const newClass = await client.request({
      url: "https://walletobjects.googleapis.com/walletobjects/v1/genericClass",
      method: "POST",
      data: walletClass,
    });

    return newClass.data
  }

  return getClass.data
  
}