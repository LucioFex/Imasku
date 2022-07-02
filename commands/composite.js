module.exports = {
    name: 'composite',
    description: 'Add image to an empty PNG background',
    async execute(client, message, args) {
        // Save of the image inside an array to add only one image by 'filter'
        const rawImages = []; // Images submited by the user
        message.attachments.every((file) => rawImages.push(file.url));

        // In case the user didn't submit an image
        if (rawImages.length < 2) {
            return message.channel.send('You need to send two images, the render and the background');
        }

        // Import of packages to process the image
        const sharp = require('sharp');
        // Use of dynamic import ('Got' is an ESM package)
        const gotModule = await import('got');
        const got = gotModule.default;

        // Getting first image via url
        const imageUrl = rawImages[0]; // Img 1
        const sharpStream = sharp();
        got.stream(imageUrl).pipe(sharpStream);

        // Gettings background image via url
        const bgImageUrl = rawImages[1]; // Img 2
        let bgSharpStream = sharp();
        got.stream(bgImageUrl).pipe(bgSharpStream);

        // Applying effect, and saving it
        const mainImgSize = await sharpStream.metadata();
        bgSharpStream.resize(mainImgSize.width, mainImgSize.height);
        bgSharpStream = await bgSharpStream.toBuffer()

        sharpStream.composite([{ input: bgSharpStream, gravity: 'north', blend: 'dest-over'}]);


        const { randomToken, removeProcessedImage } = require('../helpers/commonFunctions');
        const imageDir = `${__dirname}/src/${randomToken()}.png`;
        await sharpStream.toFile(imageDir);

        // Bot sending the image to the chat
        await message.channel.send({ files: [imageDir] });
        removeProcessedImage(imageDir);
    },
};
