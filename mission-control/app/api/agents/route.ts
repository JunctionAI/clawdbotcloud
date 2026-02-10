import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), "..", "data", "mission-control", "agents.json");
    const content = await readFile(dataPath, "utf-8");
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading agents file:", error);
    return NextResponse.json({ error: "Failed to read agents" }, { status: 500 });
  }
}
