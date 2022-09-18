module.exports = {
  name: "guildMemberUpdate",
  async execute(oldmember, newmember, client, config) {
    if(newmember.guild.id !== BigInt(config.guild)) return;
    console.log("Member updated");
    if (oldmember.pending !== newmember.pending) {
          const userRole = newmember.guild.roles.cache.fetch(BigInt(config.member_role));
          newmember.roles.add(userRole, "User hat die Regeln Akzeptiert!");
    }
  },
};
