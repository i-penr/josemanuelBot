/* eslint-disable no-unused-vars */
const Discord = require ('discord.js');

module.exports = {

  'name': 'monopoly',
  'description': 'Juego al que nunca jugaremos',
  'aliases': ['mp'],

  execute(msg, args, client) {
    msg.channel.send({ files: [new Discord.MessageAttachment('../multimedia/img/monopoly.jpg')]})
  },
};