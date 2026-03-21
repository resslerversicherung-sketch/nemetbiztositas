import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalLeads,
      openLeads,
      successLeads,
      failedLeads,
      totalCustomers,
      totalClaims,
      leadsByType,
      leadsByMonth,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "open" } }),
      prisma.lead.count({ where: { status: "success" } }),
      prisma.lead.count({ where: { status: "failed" } }),
      prisma.user.count({ where: { role: "customer" } }),
      prisma.claim.count(),
      prisma.lead.groupBy({ by: ["type"], _count: true }),
      prisma.lead.groupBy({
        by: ["createdAt"],
        _count: true,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // Aggregate monthly data
    const monthlyData: Record<string, number> = {};
    leadsByMonth.forEach((item) => {
      const month = new Date(item.createdAt).toISOString().slice(0, 7);
      monthlyData[month] = (monthlyData[month] || 0) + item._count;
    });

    const conversionRate = totalLeads > 0 ? ((successLeads / totalLeads) * 100).toFixed(1) : "0";

    return NextResponse.json({
      totalLeads,
      openLeads,
      successLeads,
      failedLeads,
      totalCustomers,
      totalClaims,
      conversionRate,
      leadsByType: leadsByType.map((l) => ({ type: l.type, count: l._count })),
      monthlyData: Object.entries(monthlyData).map(([month, count]) => ({ month, count })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
