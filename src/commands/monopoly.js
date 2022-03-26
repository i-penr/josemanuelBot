// This command used to be a full-funcioning monopoly, but it was so spaghetti that I removed it.

const Discord = require ('discord.js');

module.exports = {

  'name': 'monopoly',
  'description': 'Juego al que nunca jugaremos',
  'aliases': ['mp'],

  execute(msg) {
    msg.channel.send({ files: [new Discord.MessageAttachment('../multimedia/img/monopoly.jpg')] });
  },
};