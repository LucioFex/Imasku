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
            return message.channel.send(
                'You need to send two images, the render and the background',
            );
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
        const composited = sharp();
        got.stream(rawImages[1].url).pipe(composited); // Img 2

        // Applying effect, and saving it
        sharpStream
            .composite([{
                input: await composited.toBuffer(),
                gravity: 'north',
                blend: 'dest-over',
            }]);

        // Bot sending the image to the chat
        await message.channel.send({ files: [await sharpStream.toBuffer()] });
    },
};
