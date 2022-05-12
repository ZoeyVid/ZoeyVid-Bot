module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.channelId === "840296990168449045") {
      message.crosspost();
    }
  },
};
