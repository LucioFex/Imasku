const fs = require('fs');

// It generates a random token by the following concept:
const randomToken = () => Math.random().toString(36).substring(2);

// It Removes the 'processedTOKEN.png' file from the 'commands/src' folder
const removeProcessedImage = (dir) => fs.unlinkSync(dir);

module.exports = {
    randomToken, removeProcessedImage,
};
