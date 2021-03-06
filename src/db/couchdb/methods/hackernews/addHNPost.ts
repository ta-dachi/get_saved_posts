import Comment from "src/models/hackernews/Comment";
import Story from "src/models/hackernews/Story";
import nano from "../../connect";
import getStoryAndCommentsById from "@src/api/hackernews/v0/getStoryAndCommentsById";

export default async function addHNPost(dbName: string, item: Story) {
  try {
    const db = nano.use(dbName);
    const inserted = await db.insert(item);
    item.processAPIResponse(inserted);
    return item;
  } catch (error) {
    console.log(error.reason);
    return null;
  }
}

// (async () => {
//   const story = await getStoryAndCommentsById("20857887");
//   const addedHNPost = await addHNPost("gre-uniqueid", story);
//   console.log(addedHNPost);
// })();
