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
                'All the commands expect you to send an image or mention someone, these usually start '
                + 'with the name of the filter and the parameter.\n\n'
                + 'If you see a command like this: `tint | color`, '
                + 'then you should type something like `+tint blue` with an image, or `+tint blue @mention`',
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
                '> `flip`: Vertical rotation'
                + '\n> `flop`: Horizontal rotation'
                + '\n> `threshold`: Convert the image to black and white pixels only'
                + '\n> `rotate | degrees`: Rotates an image'
                + '\n> `blur | level`: Apply blur filter'
                + '\n> `gamma | level`: Modify image gamma (light and dark)'
                + '\n> `sharpen | level`: Sharps the image'
                + '\n> `median | level`: Apply median filter',
            )
            .addField(
                '🔲  Image Compositions',
                '> `hue | degrees`: Change the hue of the image'
                + '\n> `light | level`: Change the lightness of the image'
                + '\n> `bright | level`: Change the brightness of the image'
                + '\n> `saturate | level`: Change the saturation of the image'
                + '\n> `background | color`: Add color to an empty PNG image background'
                + '\n> `compose | image`: Add image to an empty PNG background',
            )
            .addField(
                '🔎  Image Resizing',
                '> `width | pixels mode`: Resize only the width of the image'
                + '\n> `height | pixels mode`: Resize only the height of the image'
                + '\n> `resize | pixels pixels mode`: Resize the width and height of the image',
            )
            .addField(
                '🔨  Tools',
                '> `colors`: Shows all available colors to apply to images'
                + '\n> `composite`: Shows how to compose two images'
                + '\n> `resizing`: Shows how to manipulate image sizes',
            );

        return message.channel.send( // Preparation of local images to use
            { embeds: [helpAnswer], files: ['./public/src/info.png'] },
        );
    },
};
