const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");
const { getBonusFromText, generateRollString } = require("../../utils/riskUtils");

const interaction = {
    data: new SlashCommandBuilder()
        .setName('risk')
        .setDescription('EL PUTO DADO DEL RISK AHORA EN SLASH'),
    async execute(interaction) {
        const roll = interaction.id;
        await promptModal(interaction);

        const filter = (interaction) => interaction.customId === 'rollModal';
        interaction.awaitModalSubmit({ filter, time: 60000 })
            .then(interaction => {
                const text = interaction.fields.getTextInputValue('actionInput')
                const bonus = getBonusFromText(text);

                if (text.length === 0) {
                    return interaction.reply({ content: 'Falta la acción, colega...', ephemeral: true });
                }

                interaction.reply({ content: generateRollString(text, bonus, roll), ephemeral: true });
            })
            .catch(console.error);
    },
}

module.exports = { interaction };

async function promptModal(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('rollModal')
        .setTitle(`Roll de ${interaction.user.username}`);

    const actionInput = new TextInputBuilder()
        .setCustomId('actionInput')
        .setLabel("Introduce la acción del rol")
        .setPlaceholder('Me cago encima... spills me meo (+1).')
        .setStyle(TextInputStyle.Paragraph);

    const actionRow = new ActionRowBuilder().addComponents(actionInput);
    modal.addComponents(actionRow);

    await interaction.showModal(modal);
}
