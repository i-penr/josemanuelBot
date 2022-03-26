/* eslint-disable no-unused-vars */
const Discord = require ('discord.js');
const mv = require('../../db/pelis/controllers/pelis');

module.exports = {

  'name': 'peli',
  'description': 'peli',
  'aliases': ['pelis', 'p', 'pl', 'pelicula', 'películas', 'película', 'peliculas'],
  'cooldown': 5000,

  async execute(msg, args, client) {

    let user = msg.mentions.users.first();
    if (!user) user = msg.author;

    console.log("asdjfkldjsaklfjsdakl")

    const clubDelCineRole = msg.guild.roles.cache.get('771318047746031616');

    function trim(x) {
      return x.replace(/^\s+|\s+$/gm, '');
    }

    switch (args[1]) {
    case 'select':
      mv.selectAllPelis((results) => {
        msg.channel.send(results);
      });
      break;

    case 'insert': {
      if (msg.author.id === '220525113404030987') {
        // peli: [title, year, duration, imdb_rating, chavales_rating, visualization_date, dirName, dirSurname, dirBD, actName, actSurname, actBD, actCharacter]

        args.splice(0, 3);
        const dataWithTrailingSpaces = args.join(' ').split(',');
        // Una vez más, esta variable sí que cambia en el forEach
        // eslint-disable-next-line prefer-const
        let data = [];

        dataWithTrailingSpaces.forEach((elem, index) => {
          data[index] = trim(elem);
        });

        if (data.length !== 13) { return console.log('Not enough elements');}

        // En slice el último valor no entra, por eso el +1
        const peliData = data.slice(0, 5 + 1);
        console.log('P', peliData);
        const directorData = data.slice(6, 8 + 1);
        console.log('D', directorData);
        const actorData = data.slice(9, 12 + 1);
        console.log('A', actorData);

        peliData.push(msg.mentions.users.first().id);

        mv.insertPeli(peliData);

        await mv.insertDirector(directorData);
        await mv.insertActor(actorData);
        await mv.insertDirects(directorData, peliData);
        await mv.insertActorActs(actorData, peliData);

        msg.channel.send('Peli metida 😎').then((m) => {
          m.delete(1500);
          msg.delete(1500);
        }).catch((err) => console.error(err));
      }
      break;
    }

    case 'dias': case'sinpeli': case 'pain': {
      mv.getLastFilmDate((peli) => {
        const diffTime = Math.abs(new Date(Date.now()) - peli[0].visualization_date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        console.log('hola')

        msg.channel.send(`Días sin peli: **${diffDays}**`);
      });
      break;
    }

    case 'puntos': {
      mv.selectPoints(user.id, (points) => {
        msg.channel.send(`${client.users.get(user.id)} tiene **${points}** puntos.`);
      });
      break;
    }


    case 'chpuntos': {
      // çpeli chpuntos @user num

      if (msg.author.id === '220525113404030987' && !isNaN(args[3])) {
        mv.addPoints(args[3], user.id);
        msg.channel.send('Puntos modificados correctamente');
      }
      break;
    }


    case 'ficha': case 'info': {

      mv.selectPelisFromUser(user.id, (pelis) => {
        if (pelis.length === 0) return console.log(`User ${msg.author.username} has not chosen any films`);
        // fav[0] géneros, fav[1] directores, fav[2] actores
        mv.getFavouriteEverything(user.id, (fav) => {

          const mejorPeli = pelis.reduce((p, c) => p.imdb_rating > c.imdb_rating ? p : c);
          const peorPeli = pelis.reduce((p, c) => p.imdb_rating < c.imdb_rating ? p : c);
          let favDescriptons = ['', '', ''];
          let averageRating = 0;
          let totalTime = 0;
          pelis.forEach((elem) => { totalTime += elem.duration; });

          if (!clubDelCineRole) return console.log('Role Club del Cine not found');

          try {
            // En los indices impares está el OkPacket que sale de las consultas SET que se ejecutan con los procedimientos, que no queremos
            // Uso for en vez de forEach porque no es necesario recorrer todos los elementos del array por lo de arriba (de ahí el i += 2)
            // Se puede usar forEach con un if, pero no me parece adecuado para esta situación
            for (let i = 0; i < fav.length; i += 2) {
              fav[i].forEach((elem, j) => {
                // Nombre + apellido (si no es género) + numPelículas + ', ' (si no es el último elemento)
                favDescriptons[i / 2] += elem.name + ((i !== 0) ? ` ${elem.surname}` : '') + ` (x${elem.NumPelículas})` + ((j !== elem.length - 1) ? ', ' : '');
              });
            }
          } catch (err) { favDescriptons = ['Epic error', 'Epic error', 'Epic error']; return console.log(err); }

          pelis.forEach((elem) => { averageRating += elem.imdb_rating; });
          averageRating /= pelis.length;

          mv.selectPoints(user.id, (points) => {
            const ticket = new Discord.MessageEmbed()
              .setTitle('FICHA DEL CLUB DEL CINE DE ' + user.username.toUpperCase())
              .setThumbnail(user.avatarURL)
              .setFooter('Club del Cine ™  ')
              .setTimestamp(clubDelCineRole.createdTimestamp)
              .addField('Nº de pelis', pelis.length, true)
              .addField('Puntos', points, true)
              .addField('Nota media (IMDb)', averageRating.toFixed(2), true)
              .addField('Tiempo total', `${Math.floor(totalTime / 60)}h` + ((totalTime % 60 !== 0) ? ` ${totalTime % 60} min` : ''))
              .addBlankField()
              .addField('Mejor peli', mejorPeli.title + ` (${mejorPeli.year})`, true)
              .addField('Peor peli', peorPeli.title + ` (${peorPeli.year})`, true)
              .addField('Género Favorito', favDescriptons[0])
              .addField('Director Favorito', favDescriptons[1])
              .addField('Actor Favorito', favDescriptons[2])
              .setColor(clubDelCineRole.color);

            msg.channel.send(ticket).then((m) => {
              msg.delete({ timeout: 60000 });
              m.delete({ timeout: 60000 });
            }).catch((err) => console.error(err));
          });
        });
      });
      break;
    }


    case 'pelis': {
      let embedColor = '#FFFFFF';
      let createdTs = new Date(Date.now());

      if (clubDelCineRole) {
        embedColor = clubDelCineRole.color;
        createdTs = clubDelCineRole.createdTimestamp;
      }

      mv.selectPelisFromUser(user.id, (allPelis) => {
        let pelisMessage = '';

        allPelis.forEach((elem, index) => {
          console.log(elem.title);
          pelisMessage += `${elem.title} (${elem.year})`;
          if (index != allPelis.length - 1) pelisMessage += '\n';
        });

        const movieEmbed = new Discord.MessageEmbed()
          .setColor(embedColor)
          .setFooter('Club del Cine ™  ')
          .setTimestamp(createdTs)
          .addField(`Pelis de ${user.username}: `, pelisMessage);
        msg.channel.send(movieEmbed).then((m) => {
          msg.delete({ timeout: 60000 });
          m.delete({ timeout: 60000 });
        }).catch((err) => { console.error(err); });
      });
      break;
    }


    case 'leaderboard': {
      let embedColor = '#FFFFFF';
      let createdTs = new Date(Date.now());

      if (clubDelCineRole) {
        embedColor = clubDelCineRole.color;
        createdTs = clubDelCineRole.createdTimestamp;
      }

      mv.getLeaderboard((results) => {

        const leaderboardEmbed = new Discord.MessageEmbed()
          .setTitle('LEADERBOARD DEL CLUB DEL CINE')
          .setColor(embedColor)
          .setFooter('Club del Cine ™  ')
          .setTimestamp(createdTs);

        results.forEach((elem, index) => {
          leaderboardEmbed.addField(`${index + 1}. ${elem.username}`, `${elem.puntos} puntos\n`);
        });

        msg.channel.send(leaderboardEmbed).then((m) => {
          msg.delete({ timeout: 60000 });
          m.delete({ timeout: 60000 });
        });
      });
      break;
    }
    }
  },
};