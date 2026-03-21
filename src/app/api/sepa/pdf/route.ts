import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Generate German SEPA mandate PDF data
// This returns the mandate data formatted for German PDF generation
// The actual PDF is generated client-side using jsPDF
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mandateId = searchParams.get("id");

    if (!mandateId) {
      return NextResponse.json({ error: "Missing mandate ID" }, { status: 400 });
    }

    const mandate = await prisma.sepaMandate.findUnique({
      where: { id: mandateId },
    });

    if (!mandate) {
      return NextResponse.json({ error: "Mandate not found" }, { status: 404 });
    }

    // Return data formatted for German PDF
    const pdfData = {
      title: "SEPA-Lastschriftmandat",
      subtitle: "SEPA Direct Debit Mandate",
      mandateReference: mandate.mandateReference,
      creditor: {
        name: "Német Biztosítás 24 GmbH",
        address: "Musterstraße 1, 12345 Berlin",
        creditorId: "DE98ZZZ09999999999",
      },
      debtor: {
        name: mandate.accountHolder,
        address: mandate.address,
        iban: mandate.iban,
        bic: mandate.bic,
        bankName: mandate.bankName,
      },
      text: [
        "Ich ermächtige die Német Biztosítás 24 GmbH, Zahlungen von meinem Konto mittels Lastschrift einzuziehen.",
        "Zugleich weise ich mein Kreditinstitut an, die von der Német Biztosítás 24 GmbH auf mein Konto gezogenen Lastschriften einzulösen.",
        "Hinweis: Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen.",
        "Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.",
      ],
      signatureData: mandate.signatureData,
      signedAt: mandate.signedAt.toISOString(),
      email: mandate.email,
    };

    return NextResponse.json(pdfData);
  } catch (error) {
    console.error("SEPA PDF error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
