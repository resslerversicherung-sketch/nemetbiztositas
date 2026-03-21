import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateId } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accountHolder, iban, bic, bankName, signatureData, email, phone, address } = body;

    if (!accountHolder || !iban || !bic || !bankName || !signatureData || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const mandateReference = generateId("SEPA-");

    const mandate = await prisma.sepaMandate.create({
      data: {
        accountHolder,
        iban,
        bic,
        bankName,
        mandateReference,
        signatureData,
        signedAt: new Date(),
        email,
        phone: phone || null,
        address: address || "",
      },
    });

    // Create lead for CRM
    await prisma.lead.create({
      data: {
        type: "sepa_mandate",
        data: JSON.stringify({ mandateId: mandate.id, accountHolder, iban, email }),
        language: body.language || "hu",
        source: "website",
        status: "open",
        priority: "medium",
      },
    });

    return NextResponse.json({ id: mandate.id, mandateReference }, { status: 201 });
  } catch (error) {
    console.error("SEPA mandate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
