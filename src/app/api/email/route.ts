import { NextRequest, NextResponse } from "next/server";
import { sendEmail, portalChangeEmail } from "@/lib/email";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, changeType, locale } = body;

    if (!userId || !changeType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, language: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const emailContent = portalChangeEmail(user.name, changeType, locale || user.language);
    emailContent.to = user.email;

    const sent = await sendEmail(emailContent);

    // Log the email
    await prisma.emailLog.create({
      data: {
        to: user.email,
        subject: emailContent.subject,
        body: emailContent.html,
        status: sent ? "sent" : "failed",
        type: changeType,
      },
    });

    return NextResponse.json({ success: sent });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
