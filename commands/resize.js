module.exports = {
    name: 'resize',
    description: 'Resize the width and height',
    async execute(client, message, args) {
        // Save of the image inside an array to add only one image by 'filter'
        // Mentions or Images submited by the user
        const rawImages = []; // Images submited by the user

        const mention = message.mentions.users.first();
        message.attachments.every((file) => rawImages.push({
            url: file.url, width: file.width, height: file.height,
        }));

        if (mention !== undefined) {
            // If the user mentioned someone, that person's avatar will be edited
            rawImages.push({ url: mention.avatarURL(), width: 256, height: 256 }, 'avatar');
        } else if (rawImages.length === 0) {
            // In case the user has not sent an image or an avatar
            rawImages.push({ url: message.author.avatarURL(), width: 256, height: 256 }, 'avatar');
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

        try {
            // Images fetch
            const imageUrl = rawImages[0].url;
            const imgBuffer = (await got(imageUrl, { responseType: 'buffer' })).body;

            // Applying effect, and saving it
            let mode = args[2];
            if (!['cover', 'inside', 'fill'].includes(args[2])) {
                mode = 'fill'; // Default fit
            }

            // If the image is an avatar, the size will double (128px * 2) x (128px * 2)
            const sharpStream = sharp(imgBuffer);
            if (rawImages[rawImages.length - 1] === 'avatar') sharpStream.resize(256, 256);

            // Default width (null), selected height (args[0])
            const [width, height] = [parseInt(args[0]), parseInt(args[1])];
            sharpStream.resize(width, height, { fit: mode });

            // Bot sending the image to the chat
            return message.channel.send({ files: [await sharpStream.toBuffer()] });
        } catch (err) {
            return message.channel.send('I had a problem trying to edit the image 💀');
        }
    },
};
