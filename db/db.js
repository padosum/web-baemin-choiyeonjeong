import path from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.basename(__filename));
const file = path.join(__dirname, "db", "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

export default db;
