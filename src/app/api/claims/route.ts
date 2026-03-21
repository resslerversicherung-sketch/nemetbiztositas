import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateId } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, description, incidentDate, data, userId, contractId } = body;

    if (!type || !description || !incidentDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const claimNumber = generateId("CLM-");

    const claim = await prisma.claim.create({
      data: {
        claimNumber,
        type,
        description,
        incidentDate: new Date(incidentDate),
        data: JSON.stringify(data || {}),
        userId: userId || undefined,
        contractId: contractId || undefined,
        status: "submitted",
      },
    });

    // Create lead for CRM
    await prisma.lead.create({
      data: {
        type: "claim",
        data: JSON.stringify({ claimId: claim.id, claimNumber, type, ...body }),
        language: body.language || "hu",
        source: "website",
        status: "open",
        priority: type === "kfz" ? "high" : "medium",
      },
    });

    return NextResponse.json({ id: claim.id, claimNumber }, { status: 201 });
  } catch (error) {
    console.error("Claim creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
