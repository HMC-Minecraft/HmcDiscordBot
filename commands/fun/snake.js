const { Snake } = require('discord-gamecord');
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('snake')
    .setDescription('Launches Snake Game'),
    async execute (interaction) {
          const Game = new Snake({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: 'Snake Game',
                overTitle: 'Game Over',
                color: '#5865F2'
            },
            emojis: {
                board: '⬛',
                food: '🐸',
                up: '⬆️',
                down: '⬇️',
                left: '⬅️',
                right: '➡️',
            },
            stopButton: 'Stop',
            timeoutTime: 60000,
            snake: {head: '🟢', body: '🟩', tail: '🟢', over: '💀'},
            foods: ['🐸', '🐛', '🦋', '🕷️'],
            playerOnlyMessage: 'Only {player} can use these buttons.'

          });

          Game.startGame();
          Game.on('gameOver', result => {
            return;
          });
    }
}
