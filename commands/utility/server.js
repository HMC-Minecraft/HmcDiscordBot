const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		const onlineCount = interaction.guild.members.cache.filter(m => m.presence?.status === 'online').size;
		
		return interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nOnline members: ${onlineCount}`);
	},
};