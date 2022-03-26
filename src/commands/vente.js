
module.exports = {

  'name': 'vente',
  'description': 'Jose Manuel viene',
  'aliases': [],
  'cooldown': 5000,

  execute(msg, args, client) {
    const voiceCh = msg.member.voice.channel;
    if (voiceCh && !voiceCh.full && voiceCh.joinable) {
      voiceCh.join()
        .then(connection => {
          msg.channel.send('Pa dentro');
          connection.play('./../multimedia/aud/hola.mp3');

          const check = () => {
            if (voiceCh.members.size === 1) {
              msg.channel.send('No me dejen solo :(');
              connection.disconnect();
            }
          };
          client.setInterval(check, 60000);
        })
        .catch(error => console.log(error));
    } else {
      msg.channel.send('No estás en una sala de voz');
    }
  },
};