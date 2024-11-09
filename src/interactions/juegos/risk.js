const { SlashCommandBuilder } = require("discord.js");

const interaction = {
    data: new SlashCommandBuilder()
            .setName('risk')
            .setDescription('EL PUTO DADO DEL RISK AHORA EN SLASH'),
    async execute(interaction) {
        await interaction.reply(`Pong!\nLatency: ${Date.now() - interaction.createdTimestamp} ms`);
    },
}

module.exports = { interaction };