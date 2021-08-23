//Query Channels
export const queryChannels = async (chatClient, setChannels, userId) => {
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
  } catch (error) {
    console.log("query channels failed", error);
  }
};
