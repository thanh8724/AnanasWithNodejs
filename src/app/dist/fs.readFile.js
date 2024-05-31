import { promises as fs } from "fs";
export async function readFileJson(path) {
    const data = await fs.readFile(path, "utf8");
    return JSON.parse(data);
}
