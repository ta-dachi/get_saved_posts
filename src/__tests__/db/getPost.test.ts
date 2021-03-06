import removeUserDb from "@src/db/couchdb/methods/removeUserDb";
import createUserDb from "@src/db/couchdb/methods/createUserDb";
import getSubmissionById from "@src/api/reddit/v1/getSubmissionById";
import { snoowrapConfig } from "@src/config/reddit/config";
import addRedditPost from "@src/db/couchdb/methods/reddit/addRedditPost";
import getRedditPost from "@src/db/couchdb/methods/reddit/getRedditPost";

beforeAll(async done => {
  const destroyed = await removeUserDb("testdb");
  console.log(destroyed);
  const created = await createUserDb("testdb");
  console.log(created);
  const submission = await getSubmissionById("cstxi8", snoowrapConfig);
  const added = await addRedditPost("testdb", submission);
  // console.log(added);
  done();
}, 100000);

afterAll(async done => {
  const destroyed = await removeUserDb("testdb");
  done();
}, 100000);

describe("getPost DB async works", () => {
  test("should return null", async () => {
    const submission = await getRedditPost("testdb", "this is a bad id");
    expect(submission).toStrictEqual({ reason: "missing", return: null });
  }, 50000); // Jest.timeout defaults to 5000, so set it to 10000 for more time

  test("should show a submission from /r/nba with the title that contains 'struggles'", async () => {
    const submission = await getRedditPost("testdb", "cstxi8");

    expect(submission["title"]).toContain("struggles");
  }, 50000);
});
