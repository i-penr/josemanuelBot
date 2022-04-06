const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const DiscordVoice = require('@discordjs/voice');

module.exports = {

  'name': 'melendi',
  'description': 'Melendi',
  'aliases': [],
  'cooldown': 5000,

  async execute(msg) {
    const voiceChannel = msg.member.voice.channel;
    const playlist = await ytpl('PLDXkvhEQp_SN7Tu5TSt-FM-nKieAAIO0E');
    const i = Math.floor(Math.random() * playlist.items.length) + 1;
    const song = ytdl(playlist.items[i].shortUrl);
    const resource = DiscordVoice.createAudioResource(song);
    const player = DiscordVoice.createAudioPlayer();
    const permissions = voiceChannel.permissionsFor(msg.client.user);

    if (!voiceChannel) {
      return msg.channel.send('No estás en una sala de voz...');
    }

    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return msg.channel.send('No tengo permisos para entrar ahí');
    }

    const connection = DiscordVoice.joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: msg.member.guild.id,
      adapterCreator: msg.guild.voiceAdapterCreator,
    });

    connection.on('ready', () => {
      player.play(resource);
      connection.subscribe(player);
      msg.channel.send(`Pa dentro\nNombre del temita: \`${playlist.items[i].title}\``);
    });

    player.on('idle', () => {
      connection.disconnect();
      connection.destroy();
    });
  },
};
