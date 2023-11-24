const { Hangman} = require('discord-gamecord');

module.exports = {
    name: 'hangman',
    description: 'Launches a hangman game!',
    run: async ( client, message , args) => {
        const words = ['trees', 'rivers', 'sunsets', 'vampires', 'cultures', 'history','landmarks',
        'pizza','sushi','zombies','thriller','ghosts','continents','action','mountains','cults'];
        const wordRandom = Math.floor(Math.random() * words.length)
        const Game = new Hangman({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Hangman',
                color: '#5865f2'
            },
            hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
            customWord: words[wordRandom],
            timeoutTime: 60000,
            theme: 'winter',
            winMessage: 'You Won! The word was **{word}**',
            loseMessage: 'You Lost😟. The word was **{word}**',
            playerOnlyMessage: 'Only {player} can use these buttons.'

        });
        Game.startGame();
        Game.on('gameOver', result => {
            return;
        });
    }
}