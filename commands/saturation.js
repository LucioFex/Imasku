module.exports = {
    name: 'saturation',
    description: 'Change the saturation of the image',
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

        if (!['low', 'mid', 'high'].includes(args[0])) {
            return message.channel.send('You need to add a level to apply (\'low\', \'mid\' or \'high\')');
        }

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

        // Applying effect, and saving it
        const levels = { low: 0.5, mid: 2, high: 4 };
        sharpStream.modulate({ saturation: levels[args[0]] });

        // Bot sending the image to the chat
        await message.channel.send({ files: [await sharpStream.toBuffer()] });
    },
};
