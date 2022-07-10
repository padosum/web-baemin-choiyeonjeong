import db from "../../db/db.js";

const createUUID = () => {
  // https://gist.github.com/jsmithdev/1f31f9f3912d40f6b60bdc7e8098ee9f
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );

  return uuid;
};

const session = {
  async addSession(sessionId, id, name) {
    await db.read();
    db.data.sessions.push({
      sessionId,
      userInfo: {
        id,
        name,
      },
    });

    await db.write();
  },
  async findSession(id) {
    await db.read();
    const session = db.data.sessions.find((s) => s.sessionId === id);
    return session ? session : false;
  },
  async deleteSession(id) {
    await db.read();
  },
  generateSessionID() {
    return createUUID();
  },
};

export default session;
