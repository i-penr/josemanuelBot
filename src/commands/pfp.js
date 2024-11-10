const Discord = require('discord.js');

module.exports = {
  'name': 'pfp',
  'description':'Displays user\'s avatar',
  'aliases':['perfil', 'icon', 'avatar', 'profilepic'],
  'cooldown': 3000,

  execute(msg) {
    let user = msg.mentions.users.first();
    user = user ? user : msg.author;
    const avatar = new Discord.AttachmentBuilder(user.avatarURL({ format: 'png', dyamic: true }));

    msg.channel.send({ content: `${user}'s profile pic:`, files: [avatar] });

  },
};
