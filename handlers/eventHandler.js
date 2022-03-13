const fs = require('fs');

module.exports = (client) => { // Make Async later...
    const loadDirectory = (directories) => {
        const eventFiles = fs.readdirSync(`./events/${directories}`)
            .filter((file) => file.endsWith('.js'));

        for (let index = 0; index < eventFiles.length; index += 1) {
            const event = require(`../events/${directories}/${eventFiles[index]}`);
            const eventName = eventFiles[index].split('.')[0]; // E.g 'ready.js' -> 'ready'
            client.on(eventName, event.bind(null, client));
        }
    };

    ['client', 'guild'].forEach((dir) => loadDirectory(dir));
};
