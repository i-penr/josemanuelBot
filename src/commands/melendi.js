const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

module.exports = {

  'name': 'melendi',
  'description': 'Melendi',
  'aliases': [],
  'cooldown': 5000,

  async execute(msg) {
    const voiceCh = msg.member.voice.channel;
    const playlist = await ytpl('PLDXkvhEQp_SN7Tu5TSt-FM-nKieAAIO0E');
    const i = Math.floor(Math.random() * playlist.items.length) + 1;

    if (voiceCh && !voiceCh.full && voiceCh.joinable) {
      voiceCh.join()
        .then(connection => {
          msg.channel.send(`Pa dentro\nNombre del temita: \`${playlist.items[i].title}\``);
          connection.play(ytdl(playlist.items[i].shortUrl)).on('error', (error) => {
            console.log(error);
            msg.channel.send('Me he rayao [error épico]');
          })
            .on('finish', () => {
              msg.channel.send('ya está');
              clearInterval(check);
              connection.disconnect();
            });
          const checkEmpty = () => {
            if (voiceCh.members.size === 1) {
              msg.channel.send('No me dejen solo :(');
              connection.disconnect();
            }
          };
          const check = setInterval(checkEmpty, 60000);
        })
        .catch(error => console.log(error));
    } else {
      msg.channel.send('No estás en una sala de voz o no puedo unirme por algún motivo');
    }
  },
};
