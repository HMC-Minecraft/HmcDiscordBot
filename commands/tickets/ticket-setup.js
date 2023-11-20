const {SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionsBitField, PermissionFlagsBits, ButtonStyle, ComponentBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket-setup')
    .setDescription('Open a ticket in the guild')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
       
       
        const embed = new EmbedBuilder()
        .setTitle(`Contact Support`)
        .setDescription(`Create A Ticket and contact staff with the button below.`)
        .setColor('Blue')

        const ticketBtn = new ButtonBuilder()
        .setCustomId('ticketBtn')
        .setLabel('Create Ticket')
        .setEmoji('🎫') 
        .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
        .addComponents(ticketBtn)

        await interaction.reply({ embeds: [embed], components: [row] });
    }
}