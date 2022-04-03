const DiscordVoice = require('@discordjs/voice');

module.exports = {

  'name': 'vente',
  'description': 'Jose Manuel viene al canal de voz',
  'aliases': [],
  'cooldown': 5000,

  execute(msg) {
    const voiceChannel = msg.member.voice.channel;
    const permissions = voiceChannel.permissionsFor(msg.client.user);

    if (!voiceChannel) {
      return msg.channel.send('No estás en una sala de voz...');
    }

    if (!permissions.has('CONNECT')) {
      return msg.channel.send('No tengo permisos para entrar ahí');
    }

    const connection = DiscordVoice.joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: msg.member.guild.id,
      adapterCreator: msg.guild.voiceAdapterCreator,
    });

    connection.on('ready', () => {
      msg.channel.send('Pa dentro');
    });
  },
};