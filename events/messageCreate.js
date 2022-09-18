module.exports = {
  name: "messageCreate",
  async execute(message, client, config) {
    if (message.channelId === BigInt(config.gh_feed)) {
      message.crosspost();
    }
  },
};
