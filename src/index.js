require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const schedule = require('node-schedule');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES] });
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'));
const talkedRecently = new Set();

client.on('ready', () => {
  const gatoChannel = client.channels.cache.get('595718884288495759');

  client.user.setPresence({ activities:  [{ name: 'Hawaii: Part II', type: 'LISTENING' }] });

  setupCmdHandler();

  schedule.scheduleJob('5 45 * * * *', function() { gatoPicha(gatoChannel); });

  console.log('Connected');

});

client.on('messageCreate', (msg) => {

  if (!msg.content.toLowerCase().startsWith(process.env.PREFIX) || msg.author.bot) return;

  const args = msg.content.slice(process.env.PREFIX.length).split(/ +/);
  const command = args[0].toLowerCase();

  if (!client.commands.has(command)) return;

  if (talkedRecently.has(msg.author)) return msg.channel.send('Hay cooldown, lo siento');

  if (client.commands.get(command).disabled) return;

  try {
    msg.channel.sendTyping().then(() => {
      client.commands.get(command).execute(msg, args, client);
      messageCooldown(msg.author, client.commands.get(command).cooldown);
    });
  } catch (error) {
    msg.channel.send('Ha habido un error x.x');
    console.log(error);
  }

});

client.login(process.env.TOKEN);


function gatoPicha(gatoChannel) {
  const gatoChance = Math.floor(Math.random() * 10000) + 1;

  console.log(`[gatoconlapichatiesa] gatoChance = ${gatoChance} (${new Date()})`);

  switch (gatoChance) {
  case 1:
    sendMsgWithAttachment(gatoChannel, 'gatoAlt1.png');
    break;
  case 2:
    sendMsgWithAttachment(gatoChannel, 'gatoAlt2.png');
    break;
  default:
    sendMsgWithAttachment(gatoChannel, 'gatoOriginal.png');
  }
}

function sendMsgWithAttachment(channel, imageName) {
  channel.send({ files: [`../multimedia/img/${imageName}`] });
}

function messageCooldown(user, cooldownTime) {
  talkedRecently.add(user);
  setTimeout(() => {
    talkedRecently.delete(user);
  }, cooldownTime);
}
function setupCmdHandler() {
  commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
    for (const index in command.aliases) {
      client.commands.set(command.aliases[index], command);
    }
  });
}