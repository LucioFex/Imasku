const fs = require('fs');

// It generates a random token by the following concept:
const randomToken = () => Math.random().toString(36).substring(2);

// It Removes the 'processedTOKEN.png' file from the 'commands/src' folder
const removeProcessedImage = (dir1, dir2 = false) => {
    fs.unlinkSync(dir1);
    if (dir2) fs.unlinkSync(dir2);
};

module.exports = {
    randomToken, removeProcessedImage,
};
