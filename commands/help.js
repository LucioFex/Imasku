const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Give info about the bot commands',
    async execute(client, message) {
        const helpAnswer = new MessageEmbed()
            .setTitle('**💀 Command list for Imasku**')
            .setThumbnail('attachment://info.png')
            .setColor('#ffd059')
            .setDescription(
                'All commands expect you to send an image, these usually start'
                + 'with the name of the filter and the parameter.\n\n'
                + 'If you see a command like this: `tint | color`, '
                + 'then you should type something like `+tint blue`.',
            )
            .addField(
                '🖍  Color Manipulation',
                '> `sepia`: Converts the image to sepia'
                + '\n> `negate`: Negative image colors'
                + '\n> `grayscale`: Turns the image gray'
                + '\n> `tint | color`: Adds a tint to an image',
            )
            .addField(
                '📷  Image Operations',
                '> `flip`: Horizontal rotation'
                + '\n> `flop`: Vertical rotation'
                + '\n> `threshold`: Convert the image to black and white pixels only'
                + '\n> `rotate degrees`: Rotates an image'
                + '\n> `blur | level`: Apply blur filter'
                + '\n> `gamma | level`: Modify image gamma (light and dark)'
                + '\n> `sharpen | level`: Sharps the image'
                + '\n> `median | level`: Apply median filter',
            )
            .addField(
                '🔲  Image Compositions',
                '> `hue | level`: Change the hue of the image'
                + '\n> `flatten | color`: Add color to an empty PNG image background'
                + '\n> `composite | image`: Add image to an empty PNG background'
                + '\n> `lightness | level`: Change the lightness of the image'
                + '\n> `brightness | level`: Change the brightness of the image'
                + '\n> `saturation | level`: Change the saturation of the image',
            )
            .addField(
                '🔎  Image Resizing',
                '> `width | pixels`: Resize only the width of the image'
                + '\n> `height | pixels`: Resize only the height of the image'
                + '\n> `resize | pixels pixels`: Resize the width and height of the image',
            );

        message.channel.send( // Preparation of local images to use
            { embeds: [helpAnswer], files: ['./public/src/info.png'] },
        );
    },
};
