const banderas = require('../config/flaginfo.json');
const Discord = require('discord.js');

module.exports = {

  'name': 'banderas',
  'description': '¿Podrás identificar todas las banderas?',
  'aliases': ['bandera', 'band'],
  'cooldown': 5000,

  execute(msg) {
    const randomImage = banderas[Math.floor(Math.random() * banderas.length)];
    const attachment = new Discord.MessageAttachment(`../multimedia/img/banderas/${randomImage.difficulty}/${randomImage.fileName}.png`, 'bandera.png');
    const flagEmbed = new Discord.MessageEmbed()
      .setColor('#990EEF')
      .setTitle(msg.author.username + ' - ¿De dónde es esta bandera?')
      .setDescription('Simplemente envía un mensaje con el nombre del sitio')
      .setImage('attachment://bandera.png');

    msg.reply({ embeds: [flagEmbed], files: [attachment] });
    awaitForResponse(msg, randomImage.possibleSolutions);

  },
};

function awaitForResponse(msg, possibleSolutions) {
  msg.channel.awaitMessages({
    filter: m => m.author.id === msg.author.id,
    max: 1,
    time: 30000,
    errors: ['time'],
  })
    .then(m => {
      m = m.first();

      if (answerIsCorrect(m.content, possibleSolutions))
        m.reply('¡Has acertado!');
      else {
        m.reply('Lo siento pero has fallado :(');
        if (Math.random() < 0.1) {
          m.channel.send('Gracias a los dioses de la probabilidad, tienes otra oportunidad');
          awaitForResponse(msg, possibleSolutions);
        } else {
          m.channel.send(`Respuestas válidas: **${possibleSolutions.toString().split(',').join(', ')}**`);
        }
      }
    });
}

function answerIsCorrect(answer, possibleSolutions) {
  return possibleSolutions.includes(answer.toLowerCase());
}