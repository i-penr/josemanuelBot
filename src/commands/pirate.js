const DiscordVoice = require('@discordjs/voice');

module.exports = {

  'name': 'pirate',
  'description': 'Jose Manuel se va :(',
  'aliases': ['vete'],
  'cooldown': 1000,

  execute(msg) {
    const connection = DiscordVoice.getVoiceConnection(msg.member.guild.id);
    // I think if the bot is already in vc, they should have permission to leave, right? So I am not going to check for perms.

    if (!connection) {
      msg.channel.send('No estoy en ninguna sala...');
    } else {
      msg.channel.send('Adiós...');
      connection.disconnect();
      connection.destroy();
    }
  },
};