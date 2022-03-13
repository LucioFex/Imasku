const fs = require('fs');

module.exports = (client) => {
    const commandFiles = fs.readdirSync('./commands/')
        .filter((file) => file.endsWith('.js'));

    for (let index = 0; index < commandFiles.length; index += 1) {
        // commandFiles[index] is an specific file
        const command = require(`../commands/${commandFiles[index]}`);
        if (command.name) client.commands.set(command.name, command);
    }
};
