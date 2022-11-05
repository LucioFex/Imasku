const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'composite',
    description: 'Little manual to compose two images',
    async execute(client, message) {
        const embedResizing = new MessageEmbed()
            .setTitle('**💀 How to Compose Images**')
            .setColor('#ffd059')
            .setDescription(
                'In **🍱 Image Composition**, you have 2 options for the frontal image:'
                + '\n> 🔌 `size` & `direction`'
                + '\n\n> **size** can be: `small, mid, big`'
                + '\n> **direction** can be: `n, s, w, e, nw, ne, se, sw`'
                + '\n\n> **Example of `compose`**: *compose* (and add 2 imgs, the frontal one and the background)'
                + '\n> **Another example**: *compose mid ne* (and add 2 imgs, the frontal one and the background)',
            );
        return message.channel.send({ embeds: [embedResizing] });
    },
};
