const got = import('got'); // Use of dynamic import because 'Got' is an ESM package
const sharp = require('sharp');
const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config(); // Set of '.env' key values

// Intents definition for the bot development
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

// Preparation for events and commands getting:
client.commands = new Collection();
client.events = new Collection();
require('./handlers/commandHandler')(client, [sharp, got]);
require('./handlers/eventHandler')(client);

client.login(process.env.token); // Turn on the bot
