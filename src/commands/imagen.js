const Discord = require ('discord.js');
const cheerio = require('cheerio');
const request = require('request');

module.exports = {

  'name': 'imagen',
  'description': 'Busca una imagen en el internete (usa las flechas para navegar)',
  'aliases': ['img'],
  'cooldowm': 5000,

  async execute(msg, args, client) {

    args.shift();
    const query = args.join(' ');
    let index = 0;

    const prevButton = new Discord.MessageButton()
      .setCustomId('prev')
      .setLabel('<')
      .setStyle('PRIMARY')
      .setDisabled(true);

    const nextButton = new Discord.MessageButton()
      .setCustomId('next')
      .setLabel('>')
      .setStyle('PRIMARY');

    const randButton = new Discord.MessageButton()
      .setCustomId('rand')
      .setLabel('?')
      .setStyle('PRIMARY');

    const row = new Discord.MessageActionRow()
      .addComponents(
        prevButton,
        nextButton,
        randButton,
    );
  

    if (!query) return msg.channel.send('No has puesto nada, man.');


    const options = {
      url: `https://www.qwant.com/?s=0&q=${query}&t=images`,
      method: 'GET',
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'Chrome',
      },
    };


    request(options, async function(error, response, responseBody) {
      console.log('[img]', response.statusCode);

      if (error) return console.log(error);

      // Extensible a otros códigos
      switch (response.statusCode) {
        case 400: return message.channel.send('No se han encontrado imágenes.');
      }

      const $ = cheerio.load(responseBody);
      const links = $("img");

      const urls = new Array(links.length).fill(0).map((e, i) => links.eq(i).attr('src'));
      if (!urls.length) return msg.channel.send('No se han encontrado imágenes');

      const imageEmbed = createNewImageEmbed('#008000', index, urls);
      const message = await msg.reply({embeds: [imageEmbed], components: [row], allowedMentions: { repliedUser: false } });


      const filter = i => i.user.id === msg.author.id;
      const collector = message.createMessageComponentCollector({ filter, time: 60000, componentType: 'BUTTON' });
        
      collector.on('collect', async button => {
        switch (button.customId) {
          case 'prev':
            await message.edit({ embeds: [createNewImageEmbed('#008000', --index, urls)], components: [row] });
            break;
          case 'next':
            await message.edit({ embeds: [createNewImageEmbed('#008000', ++index, urls)], components: [row] });
            break;
          case 'rand':
            index = Math.floor(Math.random() * urls.length);
            await message.edit({ embeds: [createNewImageEmbed('#008000', index, urls)], components: [row] });
            break;
        }

        if (index === 0 && !prevButton.disabled) {
          prevButton.setDisabled(true)
          console.log('prev button disabled')
        }

        if (index > 0 && prevButton.disabled) {
          prevButton.setDisabled(false);
          console.log('prev button enabled')
        }

        if (index === urls.length-1 && !nextButton.disabled)
          nextButton.setDisabled(true);
        
        if (index < urls.length-1 && nextButton.disabled)
          nextButton.setDisabled(false);

        button.update({ components: [row]});
        console.log(`Index: ${index}`)
      });
        
      collector.on('end', collected => console.log(`Collected ${collected.size} items`));
      
    });

  },
};

function createNewImageEmbed(color, index, urls) {
  const newEmbed = new Discord.MessageEmbed()
  .setColor(color)
  .setFooter({ text: `Imagen ${index + 1}/${urls.length}` })
  .setImage(urls[index]);

  return newEmbed;
}