module.exports = {
    name: 'resize',
    description: 'Resize the width and height',
    async execute(client, message, args) {
        // Save of the image inside an array to add only one image by 'filter'
        const rawImages = []; // Images submited by the user
        message.attachments.find((file) => rawImages.push(file.url));

        // In case the user didn't submit an image
        if (rawImages.length === 0) {
            return message.channel.send('You need to send an image to modify');
        }
        try { // Validation of the args (width and height)
            parseInt(args[0]); parseInt(args[1]);
        } catch { // If the inserted degrees are not numeric
            return message.channel.send('You need to indicate the `width` and `height` of the image');
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

        // Applying resizing, and saving it
        let mode = args[2];
        if (!['cover', 'inside', 'fill'].includes(args[2])) {
            mode = 'fill'; // Default fit
        }

        const [width, height] = [parseInt(args[0]), parseInt(args[1])];
        sharpStream.resize(width, height, { fit: mode });

        const { randomToken, removeProcessedImage } = require('../helpers/commonFunctions');
        const imageDir = `${__dirname}/src/${randomToken()}.png`;
        await sharpStream.toFile(imageDir);

        // Bot sending the image to the chat
        await message.channel.send({ files: [imageDir] });
        removeProcessedImage(imageDir);
    },
};