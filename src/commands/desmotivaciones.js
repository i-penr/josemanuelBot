/* eslint-disable no-unused-vars */
const Discord = require ('discord.js');
const fs = require ('fs');

module.exports = {

  'name': 'desmotivaciones',
  'description': 'Crea tu propia desmotivación',
  'aliases': ['desmotivacion', 'desmotivación'],
  'cooldown': 7500,

  async execute(msg, args, client) {
    // Fuentes
    const Canvas = require('canvas');
    Canvas.registerFont('../multimedia/otros/LinLibertine_R_G.ttf', { family: 'Linux Libertine' });
    Canvas.registerFont('../multimedia/otros/arialbd.ttf', { family: 'Arialbd' });

    args.shift();

    const text = args.join(' ').split(',');
    const upperText = text[0].trim();
    text.shift();
    const lowerText = text.join(',').trim();

    if(!upperText || msg.attachments.size == 0) {
      msg.reply('Tienes que poner el mensaje como \'çdesmotivaciones , texto de arriba , texto de abajo\' y la imagen, claro');
      return;
    }

    const imagen = msg.attachments.first().url;

    const canvas = Canvas.createCanvas(650, 735); // Tamño de la imagen canvas
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('../multimedia/img/wallpaper.jpg'); // Ruta de la imagen canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    
    // Imagen 1
    const avatar = await Canvas.loadImage(imagen); // Imagen que se pone encima del canvas
    ctx.drawImage(avatar, 33, 33, 584, 584); // Los 2 primeros numeros son la posicion en la imagen de la esquina superior izquierda. Los otros 2 son el tamaño
    console.log("hola")

    // Imagen 2
    const imagen2 = await Canvas.loadImage('../multimedia/img/desm.png');
    ctx.drawImage(imagen2, 231, 607, 193, 26);

    // Texto 1
    ctx.font = '46px "Linux Libertine"';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(upperText, canvas.width / 2, 675, 581);
    
    // Texto 2
    if (lowerText) {
      ctx.font = '15px "Arialbd"';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(lowerText, canvas.width / 2, 710, 581);
    }

    
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'image.png');
    msg.channel.send({ files: [attachment] });
  },
};