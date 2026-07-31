import { NextResponse } from "next/server";

let localCount = 284;

export async function GET() {
  return NextResponse.json({ count: localCount });
}

export async function POST() {
  localCount += 1;
  return NextResponse.json({ success: true, count: localCount });
}
