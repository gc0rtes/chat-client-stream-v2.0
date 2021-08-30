import { StreamChat } from "stream-chat";
const API_KEY = process.env.REACT_APP_API_KEY;

// Instantiate the client with getInstance().
// It doesn’t make an API call.
// It is a constructor function to create a JS object with lots of functions.
const chatClient = StreamChat.getInstance(API_KEY);

//Query Channels
export const queryChannels = async (setChannel, setChannels, userId) => {
  try {
    // console.log("getChannels called");
    // console.log("what is userId", userId);
    // console.log("what is chatClient", chatClient);

    const filter = {
      $or: [
        { type: "livestream" },
        { type: "messaging", members: { $in: [userId] } },
      ],
    };

    // const filter = { members: { $in: [userId] } };

    const sort = { last_message_at: -1 };

    const result = await chatClient.queryChannels(filter, sort);
    setChannels(result);
    setChannel(result[0]);
    // console.log("what is resul[0]", result[0]);
  } catch (error) {
    console.log("query channels failed", error);
  }
};
