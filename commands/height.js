module.exports = {
    name: 'height',
    description: 'Resize only the height of the image',
    async execute(client, message, args) {
        // Save of the image inside an array to add only one image by 'filter'
        // Mentions or Images submited by the user
        const rawImages = [];
        const mention = message.mentions.users.first();
        message.attachments.find((file) => rawImages.push(file.url));

        // If the user mentioned someone, that person's avatar will be edited
        if (mention !== undefined) rawImages.push(mention.avatarURL(), 'avatar');

        // In case the user didn't submit an image
        if (rawImages.length === 0) {
            return message.channel.send('You need to send an image to modify');
        }

        // Check if user submitted wrong resolution
        const { validateResolution } = require('../helpers/commonFunctions');
        const validation = validateResolution(args[0]); // args[0] is the height
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

        // Default width (null), selected height (args[0])
        sharpStream.resize(null, parseInt(args[0]), { fit: mode });

        // Bot sending the image to the chat
        await message.channel.send({ files: [await sharpStream.toBuffer()] });
    },
};
