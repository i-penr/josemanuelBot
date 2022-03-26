const ytdl = require('ytdl-core');
const { MessageEmbed } = require('discord.js');

const queue = new Map();


module.exports = {

    'name': 'play',
    'description': 'Solo enlaces de yt',
    'aliases': [],
    'cooldown': 2000,
  
    async execute(msg, args, client) {
      const serverQ = queue.get(msg.guild.id); // Server's queue
      const voiceCh = msg.member.voice.channel;
      const req = args[1];
      let song = {};
      

      if (!req) 
        return msg.channel.send('No has puesto nada, man.');

      if (ytdl.validateURL(req)) {
        song = { title: y}
      }
    },
  };

async function videoFinder(query) {
    const videoResult = await ytSearch(query);
    return (videoResult.videos.length > 1) ? videoResult.videos : null;
}

async function promptResultChoice(res) {
  const message = '';
  for (r in res) {
    message += `${res.indexOf(r) - 1}. ${r.title} + '\n`
  }
}