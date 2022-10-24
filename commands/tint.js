module.exports = {
    name: 'tint',
    description: 'Adds a tint to an image',
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

        if (args.length === 0) {
            return message.channel.send('You need to add a color to apply to the image');
        }

        // Import of packages to process the image
        const sharp = require('sharp');
        // Use of dynamic import ('Got' is an ESM package)
        const gotModule = await import('got');
        const got = gotModule.default;

        try {
            // Images fetch
            const imageUrl = rawImages[0];
            const imgBuffer = (await got(imageUrl, { responseType: 'buffer' })).body;

            // Applying tint effect, and saving it
            const sharpStream = sharp(imgBuffer).tint(args[0]);

            // If the image is an avatar, the size will double (128px * 2) x (128px * 2)
            if (rawImages[rawImages.length - 1] === 'avatar') sharpStream.resize(256, 256);

            // Bot sending the image to the chat
            return message.channel.send({ files: [await sharpStream.toBuffer()] });
        } catch (err) {
            return message.channel.send(
                'The used color is invalid!'
                + '\nCheck out the available ones using the following command:'
                + ' `+colors`',
            );
        }
    },
};
