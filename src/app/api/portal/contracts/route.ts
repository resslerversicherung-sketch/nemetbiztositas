import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const contracts = await prisma.contract.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { claims: true, mileageReports: true } } },
    });

    return NextResponse.json(contracts);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { contractId, changes, userId } = body;

    // Create a lead for the change request
    await prisma.lead.create({
      data: {
        type: "contract_change",
        data: JSON.stringify({ contractId, changes }),
        userId,
        source: "portal",
        status: "open",
        priority: "medium",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
