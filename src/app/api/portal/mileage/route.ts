import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mileage, userId, contractId } = body;

    if (!mileage || !userId || !contractId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const report = await prisma.mileageReport.create({
      data: {
        mileage: parseInt(mileage),
        userId,
        contractId,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const contractId = searchParams.get("contractId");

    const where: any = {};
    if (userId) where.userId = userId;
    if (contractId) where.contractId = contractId;

    const reports = await prisma.mileageReport.findMany({
      where,
      orderBy: { reportDate: "desc" },
    });

    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
