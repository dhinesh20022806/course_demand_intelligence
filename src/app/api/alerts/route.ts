import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  const priceAlert = await prisma.priceAlert.findUnique({
    where: {
      userId_courseId: {
        userId: 2,
        courseId: "hello",
      },
    },
  });

  return NextResponse.json({
    status: "success",
    data: {
      priceAlert,
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { price, courseId } = body;
  await prisma.priceAlert.create({
    data: {
      price,
      userId: 2,
      courseId,
    },
  });
  return NextResponse.json({
    status: "success",
    message: "successfully updated",
  });
}

export async function PATCH(request: NextRequest) {
  // const { id } = await params;
  const body = await request.json();

  const priceAlert = await prisma.priceAlert.update({
    where: {
      id: Number(body.id),
    },
    data: body,
  });

  return NextResponse.json({
    status: "success",
    data: {
      priceAlert,
    },
  });
}
