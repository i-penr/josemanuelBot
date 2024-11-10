module.exports = {

  'name': 'bola8',
  'description': 'Jose Manuel conoce tu futuro',
  'aliases': ['b8', '8ball', '8b'],
  'cooldown': 5000,

  async execute(msg) {
    const relleno = msg.content.split(' ').slice(1).join(' ');

    if (!relleno) {
      msg.reply('Falta la pregunta o coso lo lo que sea.');
    } else {
      this.randomAnswer(msg);
    }
  },

  async randomAnswer(msg) {
    const chance = Math.floor(Math.random() * 12) + 1;

    switch (chance) {
    case 1:msg.reply('No.');break;
    case 2:msg.reply('Bueno vale, como quieras'); break;
    case 3:msg.reply('De una');break;
    case 4:msg.reply('Estás');break;
    case 5:msg.reply('Que te calles ya');break;
    case 6:msg.reply('No sé, loco');break;
    case 7:msg.reply('AAAAAAAAAAAAAAAAAAAAaaaaAAAA');break;
    case 8:msg.reply('Sinceramente, no puedo responderte estoy así:');
      msg.channel.send({ files: [`${__dirname}/../../multimedia/img/713.png`] });
      break;
    case 9:msg.reply('A ver, tú crees?');break;
    case 10:msg.reply('SISISISISI');break;
    case 11: {
      msg.reply('Por supuesto que **sí**').then((editMsg) => {
        setTimeout(()=> {
          editMsg.edit(`Por supuesto que **no**`);
        }, 3000);
      });
      break;
    }
    case 12: msg.reply('Por supuesto que **sí**'); break;
    }
  },

};