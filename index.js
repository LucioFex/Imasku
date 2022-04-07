const { Client, Intents, Collection } = require('discord.js');
const sharp = require('sharp');
// const got = require('got'); // Need fix later..

require('dotenv').config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

// Preparation for events and commands getting:
client.commands = new Collection();
client.events = new Collection();
require('./handlers/commandHandler')(client);
require('./handlers/eventHandler')(client);

client.login(process.env.token); // Turn on the bot
