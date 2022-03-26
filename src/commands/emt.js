/* eslint-disable no-unused-vars */
const Discord = require ('discord.js');
const fetch = require('node-fetch');
const config = require('../config/emtconfig');
const StaticMaps = require('staticmaps');

module.exports = {

  'name': 'emt',
  'description': 'Por si quieres saber cuánto le queda al bus',
  'aliases': ['bus'],
  'cooldown': 10000,

  async execute(msg, args, client) {

    if (!args[1]) return msg.reply('No has puesto el número de parada');

    const numStop = args[1];
    let coords = [];
    const busEmbed = new Discord.MessageEmbed();
    const map = new StaticMaps(config.options);
    let noMap = false;

    if (!args[1]) {
      msg.channel.send('Faltan parámetros');
      return;
    }


    // For the map
    await fetch(config.url + `transport/busemtmad/stops/${numStop}/detail/`, { method: 'GET', headers: config.headers })
      .then((res) => {
        if (!res.ok) {
          sendErrorEmbed(busEmbed);
        } else { return res.json(); }
      })
      .then((json) => {
        if (json.code === '81') {
          noMap = true;
          return;
        }

        coords = json.data[0].stops[0].geometry.coordinates;
        console.log('coords: ' + coords);
        
        map.render(coords, 1000)
          .then(() => map.image.save('../multimedia/map.png'))
          .catch((err) => console.error('ERROR: ' + err));
    });



    // For the time to arrival
    await fetch(config.url + `transport/busemtmad/stops/${numStop}/arrives/`, { method: 'POST', headers: config.headers, body: config.raw, redirect: 'follow' })
        .then((res) => {
          if (!res.ok) {
            sendErrorEmbed(busEmbed);
          } else { return res.json(); }
        })
          .then((json) => {
            if (!json) return;
            const stopInf = json.data[0];

            busEmbed.setTitle(`Parada ${stopInf.Arrive[0].stop}`)
              .setColor('#2c7abf')
              .setTimestamp();

            for (const arriveData of stopInf.Arrive) {
              const min = Math.floor(arriveData.estimateArrive / 60);
              const secs = arriveData.estimateArrive - min * 60;
              let eta = `${min} min ${secs} segs`;

              if (min == 0) { eta = '**>>**'; }
              busEmbed.addField(`**Línea ${arriveData.line}**`, `${eta} (Aprox.)\n${arriveData.DistanceBus.toLocaleString().replace(/,/g, '.')} m`, true);
            }
            }).then(() => {
              if (!noMap) {
                const attachment = new Discord.MessageAttachment('../multimedia/map.png', 'sample.png');
                busEmbed.setImage('attachment://sample.png');
                msg.channel.send({ embeds: [busEmbed], files: [attachment] });
              } else  msg.channel.send({ embeds: [busEmbed] });
            })
            .catch((err) => console.error(err));
  },
};


function sendErrorEmbed(embed) {
  embed.setTitle(`ERROR ${res.status}`)
  embed.setDescription(res.statusText)
  embed.setColor([255, 0, 0]);
  msg.channel.send(embed);
}