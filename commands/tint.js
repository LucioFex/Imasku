module.exports = {
    name: 'tint',
    description: 'Adds a tint to an image',
    async execute(client, message, args) {
        // Save of the image inside an array to add only one image by 'filter'
        const rawImages = []; // Images submited by the user
        message.attachments.find((file) => rawImages.push(file.url));

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

        // Applying tint effect, and saving it
        try {
            sharpStream.tint(args[0]); // Args[0] is the inserted color
        } catch (err) {
            return message.channel.send(
                'The used color is invalid!'
                + '\nCheck out the available ones using the following command:'
                + ' `+colors`',
            );
        }

        // Bot sending the image to the chat
        await sharpStream.toFile(`${__dirname}/src/processed.png`);
        return message.channel.send({ files: [`${__dirname}/src/processed.png`] });
    },
};
