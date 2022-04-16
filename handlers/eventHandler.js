const fs = require('fs/promises');

module.exports = (client) => { // Make async later...
    /* Exported module function to create events through files. */

    // Function to search every dir in the 'events' folder to process every file
    const loadDirectory = async (directories) => {
        let eventFiles = await fs.readdir(`./events/${directories}`);
        eventFiles = eventFiles.filter((file) => file.endsWith('.js'));

        // For every file that ends in '.js', assign a Discord event to it
        for (let index = 0; index < eventFiles.length; index += 1) {
            const event = require(`../events/${directories}/${eventFiles[index]}`);
            const eventName = eventFiles[index].split('.')[0]; // E.g 'ready.js' -> 'ready'
            client.on(eventName, event.bind(null, client));
        }
    };

    // Search of the 'client' and 'guild' folders in the 'events' folder
    ['client', 'guild'].forEach((dir) => loadDirectory(dir));
};
