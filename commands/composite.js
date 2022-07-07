module.exports = {
    name: 'composite',
    description: 'Add image to an empty PNG background',
    async execute(client, message, args) {
        // Save of the image inside an array to add only one image by 'filter'
        const rawImages = []; // Images submited by the user
        message.attachments.every((file) => rawImages.push({
            url: file.url, width: file.width, height: file.height,
        }));

        // In case the user didn't submit an image
        if (rawImages.length < 2) {
            return message.channel.send('You need to send two images, the render and the background');
        }

        // Import of packages to process the image
        const sharp = require('sharp');
        // Use of dynamic import ('Got' is an ESM package)
        const gotModule = await import('got');
        const got = gotModule.default;

        // Getting first image via url (frontal)
        const sharpStream = sharp();
        got.stream(rawImages[0].url).pipe(sharpStream); // Img 1

        // Gettings second image via url (background)
        let bgSharpStream = sharp();
        got.stream(rawImages[1].url).pipe(bgSharpStream); // Img 2
        bgSharpStream = await bgSharpStream.toBuffer(); // THE SOURCE OF ALL THE PROBLEMS?

        // Applying effect, and saving it
        sharpStream.resize(
            rawImages[1].width,
            rawImages[1].height,
            { fit: 'contain', background: '#FFFFFF00' },
        );
        sharpStream.composite([{ input: bgSharpStream, gravity: 'north', blend: 'dest-over' }]);

        const { randomToken, removeProcessedImage } = require('../helpers/commonFunctions');
        const imageDir = `${__dirname}/src/${randomToken()}.png`;
        await sharpStream.toFile(imageDir);

        // Bot sending the image to the chat
        await message.channel.send({ files: [imageDir] });
        removeProcessedImage(imageDir);
    },
};
