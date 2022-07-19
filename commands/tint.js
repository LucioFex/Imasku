module.exports = {
    name: 'tint',
    description: 'Adds a tint to an image',
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
        } if (args.length === 0) {
            return message.channel.send('You need to add a color to apply to the image');
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

        // Applying tint effect, and saving it
        try {
            sharpStream.tint(args[0]); // args[0] is the inserted color
        } catch (err) {
            return message.channel.send(
                'The used color is invalid!'
                + '\nCheck out the available ones using the following command:'
                + ' `+colors`',
            );
        }

        const { randomToken, removeProcessedImage } = require('../helpers/commonFunctions');
        const imageDir = `${__dirname}/src/${randomToken()}.png`;
        await sharpStream.toFile(imageDir);

        // Bot sending the image to the chat
        await message.channel.send({ files: [imageDir] });
        removeProcessedImage(imageDir);
    },
};
