module.exports = {
    name: 'grayscale',
    description: 'Turns the image gray',
    async execute(client, message, args) {
        // Save of the image inside an array to add only one image by 'filter'
        const rawImages = [];
        message.attachments.find((file) => rawImages.push(file.url));

        // In case the user didn't submit an image
        if (rawImages.length === 0) {
            return message.channel.send('You need to send an image to modify');
        }

        const image = rawImages[0];
        return image;
    },
};
