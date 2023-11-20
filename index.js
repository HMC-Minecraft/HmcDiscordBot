const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, PermissionsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token } = require('./config.json');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[Warning] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

client.once(Events.ClientReady, () => {
    console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
});

var tickets= []

client.on(Events.InteractionCreate, async interaction => {
    if(interaction.isButton() && interaction.customId == 'ticketBtn') {
        const modal = new ModalBuilder()
        .setCustomId('ticketModal')
        .setTitle('Support Ticket');

        const topicInput = new TextInputBuilder()
        .setCustomId('topic')
        .setLabel('Topic')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('What is the topic of your issue?')
        .setMinLength(3)
        .setMaxLength(25)
        .setRequired(true);

        const issueInput = new TextInputBuilder()
        .setCustomId('issue')
        .setLabel('Issue')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Please describe your issue.')
        .setMinLength(15)
        .setMaxLength(250)
        .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(topicInput);
        const secondActionRow = new ActionRowBuilder().addComponents(issueInput);

        modal.addComponents(firstActionRow, secondActionRow);
        await interaction.showModal(modal);
    } else if  (interaction.isModalSubmit()) {

        const topic = interaction.fields.getTextInputValue('topic');
        const issue = interaction.fields.getTextInputValue('issue');

        const channel = await interaction.guild.channels.create({
            name: `${interaction.user.username}-ticket`,
            type: ChannelType.GuildText,
            parent: '1176093309735817276',
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                   id: interaction.user.id,
                   id: '1058472674210353182',
                   allow: [PermissionsBitField.Flags.ViewChannel],
                },
            ],
        })
        const embed = new EmbedBuilder()
        .setTitle('Ticket Opened')
        .setDescription('Ticket created, please wait for a staff member.')
        .setTimestamp()
        .setFooter({ text: `Ticket Created At`})
        .addFields(
            { name: 'User', value: `\`\`\`${interaction.user.username}\`\`\``},
            { name: 'Topic', value: `\`\`\`${topic}\`\`\``},
            { name: 'Issue', value: `\`\`\`${issue}\`\`\``},
        );
        const closeBtn = new ButtonBuilder()
        .setEmoji('🔒')
        .setLabel('Close Ticket')
        .setStyle(ButtonStyle.Primary)
        .setCustomId('closeTicket');

        const row = new ActionRowBuilder().addComponents(closeBtn);

        await channel.send({ embeds: [embed], components: [row] });

        await interaction.reply({
            content: `${interaction.user.tag}, your ticket has been successfully created! You can view it here ${channel}`,
            ephemeral: true
        });
    }
})

client.on(Events.InteractionCreate, async interaction => {

    if(interaction.isButton() && interaction.customId == 'closeTicket') {
        delete tickets[interaction.user.id];
        interaction.channel.delete();

        const dmEmbed = new EmbedBuilder()
        .setTitle('Ticket Closed')
        .setDescription('Thank you for contacting support. Your ticket has been successfully closed. If you need assistance again please press the button below.')
        .setColor('Blue')
        .setTimestamp()
        .setFooter({ text: `Sent from ${interaction.guild.name}`})

        const dmButton = new ButtonBuilder()
        .setLabel('Return')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discordapp.com/channels/1058465797405675730/1176107718000529448')

        const dmRow = new ActionRowBuilder()
        .addComponents(dmButton)

        interaction.user.send({ embeds: [dmEmbed], components: [dmRow] });
        return;
    }
})


client.login(token);
 