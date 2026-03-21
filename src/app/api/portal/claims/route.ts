import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const claims = await prisma.claim.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { contract: { select: { contractNumber: true, type: true } } },
    });

    return NextResponse.json(claims);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
