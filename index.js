const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();

// const prefix = '+';
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

client.commands = new Collection();
require('./handlers/commandHandler')(client);

client.login(process.env.token); // Turn on the bot
