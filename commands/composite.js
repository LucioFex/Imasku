module.exports = {
    name: 'composite',
    description: 'Add image to an empty PNG background',
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
        const bgUrl = rawImages[1]; // background url

        const sharpImageStream = sharp();
        const sharpBgStream = sharp(); // sharp background url
        got.stream(imageUrl).pipe(sharpImageStream);
        got.stream(bgUrl).pipe(sharpBgStream);

        // Applying effect, and saving it
        // const image1 = sharp('imgs/severus.jpg');
        // let image2 = sharp('imgs/bull-terrier.jpg');

        // const imgSize1 = await image1.metadata();
        // image2.resize(imgSize1.width - 250, imgSize1.height - 130);
        // image2 = await image2.median(15).toBuffer();

        // image1.composite([{ input: image2, gravity: 'north' }]);

        const { randomToken, removeProcessedImage } = require('../helpers/commonFunctions');
        const imageDir = `${__dirname}/src/${randomToken()}.png`;
        await sharpImageStream.toFile(imageDir);

        // Bot sending the image to the chat
        await message.channel.send({ files: [imageDir] });
        removeProcessedImage(imageDir);
    },
};
