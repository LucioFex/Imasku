const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'colors',
    description: 'List of all the available colors',
    async execute(client, message) {
        const embedColors = new MessageEmbed()
            .setTitle('**💀 Available Color Options**')
            .setColor('#ffd059')
            .setDescription(
                'There are two ways to insert colors:\n 💪 With *keywords* (blue, red, green, etc...).\n 🦾 Or with *Hex Rgb* (#8b008b, #2f4f4f, #cd853f, etc...).'
                + '\n\nThe list of colors is in the following link:\nhttps://www.w3.org/wiki/CSS/Properties/color/keywords\n\n',
            );
        message.channel.send({ embeds: [embedColors] });
    },
};
