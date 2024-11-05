const Discord = require('discord.js');
const fs = require('fs');
const commandFiles = fs.readdirSync(`${__dirname}`).filter(file => file.endsWith('.js')).sort();

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
      .setTimestamp()
      .setFooter(`Page ${page + 1}/${maxPage}`);

    commandPage = commandFiles.slice(page * MAX, page*MAX+MAX)

    for (files of commandPage) {
      const command = require(`${__dirname}/${files}`);
      embed.addField(command.name, command.description, false);
    }

    msg.channel.send({ embeds: [embed] });

  },

};
