module.exports = {
    name: 'hue',
    description: 'Change the hue of the image',
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

        // Applying rotation effect, and saving it
        try {
            const degrees = parseInt(args[0]);
            sharpStream.modulate({ hue: degrees });
        } catch { // If the inserted degrees are not numeric
            return message.channel.send('You need to add a number of degrees to apply to the image');
        }

        const { randomToken, removeProcessedImage } = require('../helpers/commonFunctions');
        const imageDir = `${__dirname}/src/${randomToken()}.png`;
        await sharpStream.toFile(imageDir);

        // Bot sending the image to the chat
        await message.channel.send({ files: [imageDir] });
        removeProcessedImage(imageDir);
    },
};
