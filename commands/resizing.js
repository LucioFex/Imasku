const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resizing',
    description: 'Little manual to resize images',
    async execute(client, message) {
        const embedResizing = new MessageEmbed()
            .setTitle('**💀 How to Resize Images**')
            .setColor('#ffd059')
            .setDescription(
                'In **🔎  Image Resizing**, you have 3 commands to resize images:'
                + '\n> 📐 `width`, `height` and `resize`'
                + '\n\n> 📏`pixels` are the number of pixels in resolution (e.g: 300)'
                + '\n> 📏`mode` is the way the image is resized, there are three modes: **fill**, **cover** and **inside**:'
                + '\n\n> **fill**: The image doesn\'t respect aspect ratio (the default)'
                + '\n> **cover**: The Image respects aspect ratio, but is cropped'
                + '\n> **inside**: The image respects aspect ratio'
                + '\n\n*Example of `resize`: resize 400 300 cover*',
            );
        message.channel.send({ embeds: [embedResizing] });
    },
};
