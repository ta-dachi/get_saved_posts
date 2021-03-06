import nano from "../connect";
import createUserDB from "../methods/createUserDb";
import Details from "../../../models/auth/AuthDetails";

export default async function createAuth(dbName: string, details: Details) {
  try {
    const userCreated = await createUserDB(dbName);
    const db = await nano.use(dbName);
    const insertAuth = await db.insert(details);
    return insertAuth;
  } catch (error) {
    if (error.reason === "conflict") {
      return null;
    }
    // console.log(error);
    return null;
  }
}
