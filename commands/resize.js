module.exports = {
    name: 'resize',
    description: 'Resize the width and height',
    async execute(client, message, args) {
        // Save of the image inside an array to add only one image by 'filter'
        // Mentions or Images submited by the user
        const rawImages = [];
        const mention = message.mentions.users.first();
        message.attachments.find((file) => rawImages.push(file.url));

        if (mention !== undefined) {
            // If the user mentioned someone, that person's avatar will be edited
            rawImages.push(mention.avatarURL(), 'avatar');
        } else if (rawImages.length === 0) {
            // In case the user has not sent an image or an avatar
            rawImages.push(message.author.avatarURL(), 'avatar');
        }

        // Check if the user did submit a wrong resolution
        const { validateResolution } = require('../helpers/commonFunctions');
        const validation = validateResolution(...args); // width and height
        if (validation !== 'correct') return message.channel.send(validation);

        // Import of packages to process the image
        const sharp = require('sharp');
        // Use of dynamic import ('Got' is an ESM package)
        const gotModule = await import('got');
        const got = gotModule.default;

        // Getting image via url
        const imageUrl = rawImages[0];
        const sharpStream = sharp();
        got.stream(imageUrl).pipe(sharpStream);

        // If the image is an avatar, the size will double (128px * 2) x (128px * 2)
        if (rawImages[rawImages.length - 1] === 'avatar') sharpStream.resize(256, 256);

        // Applying resizing, and saving it
        let mode = args[2];
        if (!['cover', 'inside', 'fill'].includes(args[2])) {
            mode = 'fill'; // Default fit
        }

        const [width, height] = [parseInt(args[0]), parseInt(args[1])];
        sharpStream.resize(width, height, { fit: mode });

        // Bot sending the image to the chat
        await message.channel.send({ files: [await sharpStream.toBuffer()] });
    },
};
