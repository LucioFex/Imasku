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
                'Bot description',
            )
            .addField('**Color manipulation**', 'Add Commands') // Add later...
            .addField('**Image Operations**', 'Add Commands') // Add later...
            .addField('**Image Composition**', 'Add Commands') // Add later...
            .addField('**Image resizing**', 'Add Commands'); // Add later...

        message.channel.send(
            { embeds: [helpAnswer] },
            // { embeds: [helpAnswer], files: ['./local-sample.jpg'] },
        );
    },
};
