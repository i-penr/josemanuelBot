const Discord = require ('discord.js');

module.exports = {

  'name': 'dado',
  'description': 'Jose Manuel tira un dado de n caras (çdado n)',
  'aliases': ['dice'],
  'cooldown': 3000,

  execute(msg, args) {
    const num = args[1];
    const res = Math.floor(Math.random() * Number(num)) + 1;
    const diceEmbed = new Discord.MessageEmbed();


    if(!num || isNaN(res)) {
      msg.reply('No has puesto el número');
    } else {
      diceEmbed.setTitle(`Dado de ${num} caras`)
        .setDescription(`Resultado: **${res}**`)
        .setColor('#FF0000');

      msg.channel.send({ embeds: [diceEmbed] });
    }
  },
};