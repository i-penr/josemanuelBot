/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')).sort();

module.exports = {

  'name': 'help',
  'description': 'Displays command list',
  'aliases': ['commands', 'comandos'],
  'cooldown': 5000,

  execute(msg, args, client) {

    let page;
    const MAX = 5;
    const maxPage = Math.ceil(commandFiles.length / MAX);

    if (isNaN(args[1]) || !args[1] || Number(args[1]) <= 0) {
      page = 1;
    } else { page = Number(args[1]); }

    if (page > maxPage) {
      page = maxPage;
    }
    page--;

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Command list')
      .setAuthor(client.user.username, client.user.avatarURL)
      /* .setThumbnail('https://i.imgur.com/wSTFkRM.png')
      .setImage('https://i.imgur.com/wSTFkRM.png') */
      .setTimestamp()
      .setFooter(`Page ${page + 1}/${maxPage}`);

    for (let i = page * MAX; i < commandFiles.length * page + MAX; i++) { // Sustituir commandFiles.length por MAX cuando haya más comandos
      const command = require(`./${commandFiles[i]}`);
      embed.addField(command.name, command.description, false);
    }

    msg.channel.send({ embeds: [embed] });

  },

};
