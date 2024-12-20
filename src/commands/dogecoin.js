const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

module.exports = {

  'name': 'dogecoin',
  'description': 'Muestra el valor de las dogecoins 🤑',
  'aliases': ['dc', 'doge'],
  'cooldown': 5000,

  async execute(msg) {

    const options = {
      url: 'https://coinmarketcap.com/currencies/dogecoin/',
      method: 'GET',
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'Chrome',
      },
    };

    request(options, function(error, response, responseBody) {
      if (error) return msg.channel.send('Se ha caído la página o algo');

      const $ = cheerio.load(responseBody);

      const priceValueUSD = Number($('.alignBaseline .base-text').text().substring(1));
      console.log($('.alignBaseline .base-text').text().substring(1));
      const priceValueEUR = (priceValueUSD * 0.83180).toFixed(5);
      const oldValue = Number(fs.readFileSync('./src/config/dogecoinInfo.txt'));
      const greenTriangleEmoji = '<:green_triangle_up:807960723799277608>';
      let emoji = '';

      fs.writeFile('./src/config/dogecoinInfo.txt', String(priceValueUSD), (err) => { if (err) console.log(err); });

      if (priceValueUSD < oldValue) {
        emoji = '🔻';
      } else if (priceValueUSD > oldValue) { emoji = greenTriangleEmoji; }

      msg.channel.send(`***$${priceValueUSD} (${priceValueEUR}€) ${emoji}***`);

    });
  },
};