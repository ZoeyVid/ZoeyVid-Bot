const { gh_feed } = require('../config.json');

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.channelId === gh_feed) {
      message.crosspost();
    }
  },
};
