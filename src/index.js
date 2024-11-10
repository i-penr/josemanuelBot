require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const schedule = require('node-schedule');
const path = require('path');

const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent] });
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'));
const talkedRecently = new Set();

client.on('ready', () => {
  const gatoChannel = client.channels.cache.get('595718884288495759');

  client.user.setPresence({ activities: [{ name: 'Hawaii: Part II', type: 'LISTENING' }] });

  setupCmdHandler();

  schedule.scheduleJob('5 45 * * * *', function () { gatoPicha(gatoChannel); });

  console.log('Connected');

});

// Command handler
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

// Interaction handler
client.interactions = new Discord.Collection();

const foldersPath = path.join(__dirname, 'interactions');
const interactionFolders = fs.readdirSync(foldersPath);

for (const folder of interactionFolders) {
  const interactionsPath = path.join(foldersPath, folder);
  const interactionFiles = fs.readdirSync(interactionsPath);

  for (const file of interactionFiles) {
    const filePath = path.join(interactionsPath, file);
    const { interaction } = require(filePath);

    if ('data' in interaction && 'execute' in interaction) {
      client.interactions.set(interaction.data.name, interaction);
    } else {
      console.log(interaction)
      console.log(`[WARNING] The interaction '${file}' is not well formed.`);
    }
  }
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const executedCommand = interaction.client.interactions.get(interaction.commandName);

    if (!executedCommand) {
        console.error(`[ERROR] Command '${interaction.commandName}' does not exist.`);
        return;
    }

    try {
        await executedCommand.execute(interaction);
    } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true })
        }
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
  channel.send({ files: [`${__dirname}/../multimedia/img/${imageName}`] });
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