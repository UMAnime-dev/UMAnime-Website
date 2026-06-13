import z from "zod";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { createMembership } from "@/app/lib/membership/google-wallet";
import { NextResponse } from "next/server";

export const MembershipSchema = z.object({
    name: z.string().min(2),
    student_id: z.string(),
    email: z.string(),
    affiliation: z.string(),
    status: z.string(),
});

export async function POST(request: Request) {

    const formData = await request.formData();
    const rawData = Object.fromEntries(formData.entries());

    const parseResult = MembershipSchema.parse(rawData);

    const membership = await prisma.membership.create({
        data: {
            id: crypto.randomInt(1000000, 9999999).toString(),
            name: parseResult.name,
            student_id: parseResult.student_id,
            email: parseResult.email,
            affiliation: parseResult.affiliation,
            status: parseResult.status,
        }
    })

    const wallet = await createMembership({
        membershipId: membership.id,
        name: membership.name,
        affiliation: membership.affiliation,
        barcodeValue: process.env.DOMAIN_LINK!,
        valid_until: "May 1st 2027"
    });

    return NextResponse.json({ walletUrl: wallet });
}