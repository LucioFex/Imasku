module.exports = (client, message) => {
    /* Module to recognize when a user sends a message on Discord */
    const { prefix } = process.env;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Separation between the prefix and the bot command (message)
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    // The 'execute' function is to activate command (depending on the file)
    const command = client.commands.get(cmd);
    if (command) command.execute(client, message, args);
};
