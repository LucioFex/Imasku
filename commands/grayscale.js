module.exports = {
    name: 'grayscale',
    description: 'Turns the image gray',
    async execute(client, message, args) {
        const rawImages = [];
        message.attachments.find((file) => rawImages.push(file.url));

        if (rawImages.length === 0) {
            return message.channel.send('You need to send an image to modify');
        }
        const image = rawImages[0];
        return image;
        // keep working in this function;
    },
};
