import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const file = searchParams.get("file");

  if (!file) {
    return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
  }

  // Security: only allow specific queue files
  const allowedFiles = ["queue-alternate.json", "queue-junction.json", "queue-personal.json"];
  if (!allowedFiles.includes(file)) {
    return NextResponse.json({ error: "File not allowed" }, { status: 403 });
  }

  try {
    const dataPath = path.join(process.cwd(), "..", "data", "mission-control", file);
    const content = await readFile(dataPath, "utf-8");
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading queue file:", error);
    return NextResponse.json({ error: "Failed to read queue" }, { status: 500 });
  }
}
