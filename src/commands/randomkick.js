/*
  This is a implementation of a very popular command back in the day. It basically kicks a random person from the server.
  I don't think it works anymore due to Discord's API changes to user fetchs, but here it is.

  The actual kick line is commented out.
*/

module.exports = {

  'name': 'randomkick',
  'description': 'CUIDADOOOOOOOO!!!!',
  'aliases': ['rk'],
  'cooldown': 10000,

  async execute(msg) {
    const members = msg.guild.members.cache;
    console.log(members.size);
    const userToKick = members.random();

    msg.channel.send(`Intentando kickear a ${userToKick.user.username}...`).then((m) => { setTimeout(() => m.delete(), 3000); });

    if (userToKick.kickable) {
      msg.channel.send(`${userToKick.user.username} kickeao :(`).then((m) => { setTimeout(() => m.delete(), 3000); });
      // userToKick.kick('randomkick XD');
    } else msg.channel.send('No puedo kickear a este man').then((m) => { setTimeout(() => m.delete(), 3000); });

    setTimeout(() => msg.delete(), 3000);
  },
};