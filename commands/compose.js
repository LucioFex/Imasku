module.exports = {
    name: 'compose',
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

        try {
            const { composeOptions } = require('../helpers/commonFunctions');
            const [size = 1, gravity = 'center'] = composeOptions(args);

            // Images fetch
            const [frontImg, backImg] = rawImages;

            frontImg.buffer = (await got(frontImg.url, { responseType: 'buffer' })).body;
            backImg.buffer = (await got(backImg.url, { responseType: 'buffer' })).body;

            frontImg.sharp = await sharp(frontImg.buffer)
                .resize(
                    parseInt(backImg.width * size),
                    parseInt(backImg.height * size),
                    { fit: 'contain', background: '#00000000' },
                ).toBuffer();

            // Applying effect, and saving it
            const sharpStream = sharp(backImg.buffer)
                .composite([{
                    input: frontImg.sharp,
                    blend: 'over',
                    gravity,
                }]);

            // Bot sending the image to the chat
            return message.channel.send({ files: [await sharpStream.toBuffer()] });
        } catch (err) {
            console.error(err);
            return message.channel.send('I had a problem trying to edit the image 💀');
        }
    },
};
