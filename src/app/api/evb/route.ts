import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { vehicleType, licensePlate, name, email, phone, purpose, startDate, details } = body;

    if (!vehicleType || !name || !email || !purpose || !startDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const evbRequest = await prisma.evbRequest.create({
      data: {
        vehicleType,
        licensePlate: licensePlate || null,
        name,
        email,
        phone: phone || "",
        purpose,
        startDate: new Date(startDate),
        details: JSON.stringify(details || {}),
        status: "pending",
      },
    });

    // Also create a lead for the CRM
    await prisma.lead.create({
      data: {
        type: "evb_request",
        data: JSON.stringify({ ...body, evbRequestId: evbRequest.id }),
        language: body.language || "hu",
        source: "website",
        status: "open",
        priority: "high",
      },
    });

    return NextResponse.json({ id: evbRequest.id }, { status: 201 });
  } catch (error) {
    console.error("EVB request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
