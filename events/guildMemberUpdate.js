module.exports = {
  name: "guildMemberUpdate",
  async execute(oldmember, newmember, client, config) {
    if(newmember.guild.id !== config.guild) return;
    if (oldmember.pending !== newmember.pending) {
          const userRole = newmember.guild.roles.cache.get(config.member_role);
          newmember.roles.add(userRole, "User hat die Regeln Akzeptiert!");
    }
  },
};
