// const sharp = require('sharp');
// const got = require('got');

module.exports = {
    name: 'grayscale',
    description: 'Turns the image gray',
    async execute(client, message, args, libraries) {
        const rawImages = [];
        message.attachments.find((file) => rawImages.push(file.url));

        if (rawImages.length === 0) {
            return message.channel.send('You need to send an image to modify');
        }

        // Continue and document later...
    },
};
