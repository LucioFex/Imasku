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

        const [frontImg, backImg] = rawImages;

        try {
            // Images fetch
            const res1 = await got(frontImg.url, { responseType: 'buffer' });
            const buffer1 = res1.body;

            const res2 = await got(backImg.url, { responseType: 'buffer' });
            const buffer2 = res2.body;

            // Applying effect, and saving it
            const sharpStream = sharp(buffer1)
                .resize(backImg.width, backImg.height, { fit: 'contain', background: '#00000000' })
                .composite([{
                    input: buffer2,
                    gravity: 'north',
                    blend: 'dest-over',
                }]);

            // Bot sending the image to the chat
            await message.channel.send({ files: [await sharpStream.toBuffer()] });
        } catch (err) {
            await message.channel.send('I had a problem trying to edit the image 💀');
        }
    },
};
