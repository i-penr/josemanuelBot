/* eslint-disable no-unused-vars */
const Discord = require ('discord.js');

module.exports = {

  'name': 'risk',
  'description': 'Juego que sí jugamos',
  'aliases': [],
  'cooldown': 5000,

  execute(msg, args, client) {
    const { multi, low, med, high, zero, rollNameEquals, rollValues, rollNamePalis, rollNameStraight, isEquals, isPalis, isStraight } = require('../config/riskconfig');

    const cif = (Math.floor(Math.random() * 999999) + 1).toString();
    let bonus;
    const HORA = 18;

    if (args[1] === 'mupdate' && msg.author.id === '165895101459988480') {
      const date = new Date(Date.now());
      console.log(date.getHours());
      msg.channel.send(`<@&689174219271045313> Hora límite para rollear: ${('0' + ((date.getHours() + HORA) % 24)).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`);
    } else {

      if (!isNaN(parseInt(args[1]))) {
        bonus = parseInt(args[1]);
      } else {bonus = 0;}

      const text = msg.content.split('#').slice(1).join(' ');
      const lastDigit = parseInt(cif[cif.length - 1]);
      let done = false;
      let i = 5;

      msg.channel.send(`${msg.author}: ` + text + ' (' + cif + ')');

      let extr1 = 'Además tiras otra vez';
      while (i >= 2 && !done) {
        if (isEquals(cif, i)) {
          done = true;
          if (i === 5 || i === 4) {
            extr1 += 'y puedes construir una nueva ciudad!';
          }
          msg.reply(`Ha salido **${rollNameEquals[i]}**! (${rollValues[i]}t)\n${msg.author.username} avanza \`${multi * (rollValues[i] + bonus)}\` territorios (${rollValues[i]} + ${bonus})\n${extr1}`);
        } else if (isPalis(cif, i) && i != 2) {
          done = true;
          if (i === 5 || i === 4) {
            extr1 += 'y puedes construir una nueva ciudad!';
          }
          msg.reply(`Ha salido **${rollNamePalis[i]}**! (${rollValues[i]}t)\n${msg.author.username} avanza \`${multi * (rollValues[i] + bonus)}\` territorios (${rollValues[i]} + ${bonus})\n${extr1}`);
        } else if (isStraight(cif, i) && i != 2) {
          done = true;
          if (i === 5 || i === 4) {
            extr1 += 'y puedes construir una nueva ciudad!';
          }
          msg.reply(`Ha salido **${rollNameStraight[i]}**! (${rollValues[i]}t)\n${msg.author.username} avanza \`${multi * (rollValues[i] + bonus)}\` territorios (${rollValues[i]} + ${bonus})\n${extr1}`);
        } else {i--;}
      }

      if (lastDigit === 0 && !done) {
        msg.reply(`Ha salido **0**\n ${msg.author.username} avanza \`${multi * (zero + bonus)}\` territorios (${zero} + ${bonus})\n${extr1}`);
      } else if (lastDigit <= 3 && !done) {
        msg.reply(`*Bronze roll*\n${msg.author.username} avanza \`${multi * (low + bonus)}\` territorios (${low} + ${bonus})`);
      } else if (lastDigit <= 6 && !done) {
        done = true;
        msg.reply(`**Silver roll**\n${msg.author.username} avanza \`${multi * (med + bonus)}\` territorios (${med} + ${bonus})`);
      } else if (lastDigit <= 9 && !done) {
        msg.reply(`***Golden roll***\n${msg.author.username} avanza \`${multi * (high + bonus)}\` territorios (${high} + ${bonus})`);
      }
    }
  },
};