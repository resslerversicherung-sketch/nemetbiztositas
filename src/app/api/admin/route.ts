import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Notes API for CRM
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "add_note") {
      const { content, authorId, leadId } = body;
      if (!content || !authorId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const note = await prisma.note.create({
        data: {
          content,
          authorId,
          leadId: leadId || null,
        },
        include: { author: { select: { name: true } } },
      });

      return NextResponse.json(note, { status: 201 });
    }

    if (action === "update_lead") {
      const { leadId, status, priority, assignedTo } = body;
      const updateData: any = {};
      if (status) updateData.status = status;
      if (priority) updateData.priority = priority;
      if (assignedTo !== undefined) updateData.assignedTo = assignedTo;

      const lead = await prisma.lead.update({
        where: { id: leadId },
        data: updateData,
      });

      return NextResponse.json(lead);
    }

    if (action === "upload_document") {
      const { title, fileName, fileUrl, type, translatedUrl, userId, contractId } = body;
      const document = await prisma.document.create({
        data: {
          title,
          fileName,
          fileUrl,
          type: type || "letter",
          translatedUrl: translatedUrl || null,
          language: "de",
          userId,
          contractId: contractId || null,
        },
      });

      return NextResponse.json(document, { status: 201 });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
