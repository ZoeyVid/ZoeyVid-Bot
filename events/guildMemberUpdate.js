const { member_role, guild } = require('../config.json');

module.exports = {
  name: "guildMemberUpdate",
  async execute(oldmember, newmember) {
    if(newmember.guild.id !== guild) return;
    console.log("Member updated");
    if (oldmember.pending !== newmember.pending) {
          const userRole = newmember.guild.roles.cache.get(member_role);
          newmember.roles.add(userRole, "User hat die Regeln Akzeptiert!");
    }
  },
};
