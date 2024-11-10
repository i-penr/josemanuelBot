const Discord = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');

module.exports = {

  'name': 'cuantocabron',
  'description': 'Busca una viñeta aleatoria',
  'aliases': ['cc', 'ragecomic'],
  'cooldown': 3000,

  async execute(msg) {

    const options = {
      url: 'https://www.cuantocabron.com/aleatorio',
      method: 'GET',
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'Chrome',
      },
    };

    request(options, function(error, response, responseBody) {
      console.log('[img]', response.statusCode);

      if (error) {
        return;
      }

      const $ = cheerio.load(responseBody);

      const imgHtml = $('a[class=cclink]').html();
      const linkHtml = $('h2[class=storyTitle]').html();
      const titleHtml = $('h2[class=storyTitle]').html();
      const authorHtml = $('div[class=pre]').html();

      // parseado con cheerio (más o menos)
      const img = $(imgHtml).attr('src');
      const link = $(linkHtml).attr('href');
      const title = $(titleHtml).text();
      const author = $(authorHtml).text();
      const icon = 'https://4.bp.blogspot.com/-IKfX7umyfRM/UDeYai9abhI/AAAAAAAAKGs/AlWSNmc8I_U/s1600/Render+-+Crazy+Insane+Troll+Face+BaixeRenders.png';

      const imageEmbed = new Discord.EmbedBuilder()
        .setColor('#808080')
        .setImage(img)
        .setFooter({ text: author })
        .setAuthor({ name: 'Cuanto Cabrón', iconURL: icon, url: 'https://cuantocabron.com' })
        .setTitle(title)
        .setTimestamp()
        .setURL(link);

      msg.channel.send({ embeds: [imageEmbed] }).catch(console.error);

    });
  },
};