import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") || 1);
  const limit = Number(request.nextUrl.searchParams.get("limit") || 10);
  const skip = (page - 1) * limit;
  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      orderBy: {
        title: "asc",
      },
      skip,
      take: limit,
    }),
    prisma.course.count(),
  ]);

  return NextResponse.json({
    status: "success",
    data: {
      courses,
    },
    pagination: {
      total,
      page: page,
      pageTotal: Math.ceil(total / limit),
      limit,
    },
  });
}
