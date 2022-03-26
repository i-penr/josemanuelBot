/* eslint-disable no-unused-vars */

module.exports = {

  'name': 'pirate',
  'description': 'Jose Manuel se va :(',
  'aliases': ['vete'],
  'cooldown': 1000,

  execute(msg, args, client) {
    if (msg.guild.voice.connection) {
      msg.guild.voice.connection.disconnect();
      msg.channel.send('Adiós...');
      return;
    } else {
      msg.channel.send('No estoy en ninguna sala...');
    }
  },
};