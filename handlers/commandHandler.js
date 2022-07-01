const fs = require('fs/promises');

module.exports = async (client) => { // Make Async later...
    /* Exported module function to create commands through files. */

    // Search of every file in the 'commands' folder that has the '.js' filetype
    let commandFiles = await fs.readdir('./commands/');
    commandFiles = commandFiles.filter((file) => file.endsWith('.js'));

    // Assign of a position in the commands set for every file
    for (let index = 0; index < commandFiles.length; index += 1) {
        // commandFiles[index] is an specific file
        const command = require(`../commands/${commandFiles[index]}`);
        if (command.name) client.commands.set(command.name, command);
    }
};
