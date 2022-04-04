const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Give info about the bot commands',
    async execute(client, message) {
        const helpAnswer = new MessageEmbed()
            .setTitle('**💀 Command list for Imasku**')
            // .setThumbnail('attachment://local-sample.jpg')
            .setColor('#ffd059')
            .setDescription( // Add later...
                'All commands expect you to send an image, these usually start with the name of the filter and the parameter.\n\nFor example, if you see a command like this: `tint | color`, then you should type something like `tint blue`.',
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
                '🔲  Help and Supports',
                '> `hue | level`: Change the hue of the image'
                + '\n> `flatten | color`: Add color to an empty PNG image background'
                + '\n> `composite | image`: Add image to an empty PNG background'
                + '\n> `lightness | level`: Change the lightness of the image'
                + '\n> `brightness | level`: Change the brightness of the image'
                + '\n> `saturation | level`: Change the saturation of the image',
            )
            .addField(
                '🔎  Image Rsizing',
                '> `width | pixels`: Resize only the width of the image'
                + '\n> `height | pixels`: Resize only the height of the image'
                + '\n> `resize | pixels pixels`: Resize the width and height of the image',
            );

        message.channel.send(
            { embeds: [helpAnswer] },
            // { embeds: [helpAnswer], files: ['./local-sample.jpg'] },
        );
    },
};

// - help (info about commands)
// - Color manipulation:
//     - greyscale (makes image grey in 3 different levels)
//     - tint (I still don't know how, but give 3 colors to tint an image)
// - Image Operations:
//     - rotate (rotates an image in given °degrees)
//     - flip (Y rotation)
//     - flop (X rotation)
//     - sharpen (it sharps the image in 3 different levels)
//     - median (applies median filter in 3 different levels)
//     - blur (applies blur filter in 3 different levels)
//     - flatten (add color to an png image background)
//     - composite (Used to add images to an png image background)
//     - gamma (modifies image dark and light gamma)
//     - negate (produce negative image)
//     - threshold (converts image just into black and white pixels)
//     - recomb (just to make the sepia effect)
// - Compositing Images:
//     - modulate (allows you to user these 4 options: brightness, saturation, hue and lightness)
// - Resizing images:
//     - resize (update of the width and height of the image)
