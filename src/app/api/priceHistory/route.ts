import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const priceHistory = await prisma.$queryRaw<
    {
      graph_month: Date;
      average_price: number;
    }[]
  >`
     SELECT DATE_TRUNC('month', created_at) AS graph_month,
     AVG(price) AS average_price
     FROM price_history
     WHERE created_at >= NOW() - INTERVAL '1 year'
     GROUP BY graph_month
     ORDER BY graph_month ASC;
    `;
}
