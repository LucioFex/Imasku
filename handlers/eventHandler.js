const fs = require('fs/promises');

module.exports = (client) => {
    const loadDirectory = async (directories) => {
        let eventFiles = await fs.readdir(`./events/${directories}`);
        eventFiles = eventFiles.filter((file) => file.endsWith('.js'));

        for (let index = 0; index < eventFiles.length; index += 1) {
            const event = require(`../events/${directories}/${eventFiles[index]}`);
            const eventName = eventFiles[index].split('.')[0]; // E.g 'ready.js' -> 'ready'
            client.on(eventName, event.bind(null, client));
        }
    };

    ['client', 'guild'].forEach((dir) => loadDirectory(dir));
};
