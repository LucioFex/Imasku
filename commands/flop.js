module.exports = {
    name: 'flop',
    description: 'Horizontal rotation',
    async execute(client, message, args) {
        // Save of the image inside an array to add only one image by 'filter'
        const rawImages = []; // Images submited by the user
        message.attachments.find((file) => rawImages.push(file.url));

        // In case the user didn't submit an image
        if (rawImages.length === 0) {
            return message.channel.send('You need to send an image to modify');
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

        // Applying flop effect, and saving it
        sharpStream.flop();
        await sharpStream.toFile(`${__dirname}/src/processed.png`);

        // Bot sending the image to the chat
        return message.channel.send({ files: [`${__dirname}/src/processed.png`] });
    },
};
