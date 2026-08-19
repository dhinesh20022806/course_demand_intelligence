import { batchEvent } from "@/batch";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log(request.body);
  console.log(request.url);

  batchEvent.emit("data", "dummy");

  return NextResponse.json({ status: "success" });
}

export async function POST(request: Request) {
  console.log(request.body);

  console.log(request.headers);

  return NextResponse.json({ status: "success" });
}
