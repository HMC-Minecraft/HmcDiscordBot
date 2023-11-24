const { MatchPairs } = require ('discord-gamecord');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('matchpairs')
        .setDescription('Start A Match Game'),
    async execute (interaction) {
        const Game = new MatchPairs({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: 'Match Pairs',
                color: '#5865f2',
                description: 'Click on the buttons to match emojis with their pairs.'
            },
            timoutTime: 60000,
            emojis: ['🟥', '🟦', '🟧', '🟨', '🟩', '🟪', '🟫', '⬛', '⬜', '🔴', '🔵', '🟠'],
            winMessage: 'You won the game! You turned a total of `{titleTurned}`.',
            loseMessage: 'You lost the game',
            playerOnlyMessage: 'Only {player} can use these buttons.'

        });
        Game.startGame();
        Game.on('gameOver', result => {
            return;
        });
    }
}