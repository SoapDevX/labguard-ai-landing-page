import { promises as fs } from "fs";
import path from "path";

// Simple file storage (one JSON object per line). Set DATA_DIR to change the location.
const dir = process.env.DATA_DIR ?? path.join(process.cwd(), ".data");

export async function append(file: string, record: object) {
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(path.join(dir, file), JSON.stringify(record) + "\n");
}

export async function readAll<T>(file: string): Promise<T[]> {
  try {
    const text = await fs.readFile(path.join(dir, file), "utf8");
    return text.split("\n").filter(Boolean).map((l) => JSON.parse(l) as T);
  } catch {
    return [];
  }
}
