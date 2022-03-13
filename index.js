const { Client, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

// client.on('messageCreate', (message) => {
//     console.log('Received message:', message.attachments);
// });

client.login(process.env.token); // Turn on the bot
