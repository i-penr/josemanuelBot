const Discord = require ('discord.js');
const Canvas = require('canvas');

module.exports = {

  'name': 'mostro',
  'description': 'el mostro',
  'aliases': ['mosntruo', 'monstro'],
  'cooldown': 3000,

  async execute(msg) {

    const user = msg.mentions.users.first();

    const foto = user ? user.avatarURL({ format: 'png', dynamic: true }) : msg.author.avatarURL({ format: 'png', dynamic: true });

    const canvas = Canvas.createCanvas(480, 278); // Tamño de la imagen canvas
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('../multimedia/img/elMostro.jpg'); // Ruta de la imagen canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Imagen 1
    const avatar = await Canvas.loadImage(foto); // Imagen que se pone encima del canvas
    ctx.drawImage(avatar, 269, 40, 87, 87); // Los 2 primeros numeros son la posicion en la imagen de la esquina superior izquierda. Los otros 2 son el tamaño

    // Imagen 2
    const imagen2 = await Canvas.loadImage('../multimedia/img/filtro.png');
    ctx.drawImage(imagen2, 0, 0, 480, 278);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'image.png');

    msg.channel.send({ files: [attachment] });
  },
};