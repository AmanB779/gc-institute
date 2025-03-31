import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "db/data");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json({ error: "Type parameter is required" }, { status: 400 });
    }

    const filePath = path.join(DATA_DIR, `${type}.ts`);
    const content = await fs.readFile(filePath, "utf-8");

    // Extract the data from the TypeScript file
    const dataMatch = content.match(/export const \w+ = ({[\s\S]*});/);
    if (!dataMatch) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const data = JSON.parse(dataMatch[1]);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading content:", error);
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const data = await request.json();

    if (!type) {
      return NextResponse.json({ error: "Type parameter is required" }, { status: 400 });
    }

    const filePath = path.join(DATA_DIR, `${type}.ts`);
    const content = await fs.readFile(filePath, "utf-8");

    // Extract the variable name from the export statement
    const varMatch = content.match(/export const (\w+) =/);
    if (!varMatch) {
      return NextResponse.json({ error: "Invalid file format" }, { status: 400 });
    }

    const varName = varMatch[1];
    const newContent = `export const ${varName} = ${JSON.stringify(data, null, 2)};`;

    await fs.writeFile(filePath, newContent);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
