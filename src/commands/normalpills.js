const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = {

  'name': 'normalpills',
  'description': 'Remember to eat your pills',
  'aliases': ['np', 'normalpill', 'dinner'],
  'cooldown': 3000,

  async execute(msg, args, client) {
    const user = msg.mentions.users.first();
    const foto = user ? user.avatarURL({ format: 'png', dynamic: true }) : msg.author.avatarURL({ format: 'png', dynamic: true });
    const canvas = Canvas.createCanvas(828, 826);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('../multimedia/img/normalpills.jpg');
    const avatar = await Canvas.loadImage(foto);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatar, 315, 40, 230, 230);

    msg.channel.send({ files: [new Discord.MessageAttachment(canvas.toBuffer(), `${msg.author.username}normalpill.jpg`)] });

  },
};