import express from "express";
import path from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.basename(__filename));
const file = path.join(__dirname, "db", "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

router.post("/register_process", async (req, res, next) => {
  const post = req.body;
  const email = post.email;
  const pwd = post.pwd;
  const nickname = post.nickname;
  const birth = post.birth;

  await db.read();

  db.data ||= { users: [] };

  db.data.users.push({
    email,
    pwd,
    nickname,
    birth,
  });

  await db.write();
  res.redirect("/");
});

export { router as authRouter };
