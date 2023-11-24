const { Snake } = require('discord-gamecord');

module.exports = {
    name: 'snake',
    description: 'Launches Snake Game',
    run: async (client, message, args) => {
        const Game = new Snake({
            message: message,
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