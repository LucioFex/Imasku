const fs = require('fs');

// Generates a random token by the following concept:
const randomToken = () => Math.random().toString(36).substring(2);

const removeProcessedImage = (dir1, dir2 = false) => {
    // Removes the 'processedTOKEN.png' file from the 'commands/src' folder
    fs.unlinkSync(dir1);
    if (dir2) fs.unlinkSync(dir2);
};

const validateResolution = (dim1, dim2 = null) => {
    /*
    Returns 'correct' if the given width and/or height are a
    'number' (not NaN), greater than 0 and less than or equal to 4000
    */
    let message = '';
    dim1 = (dim1 !== null && dim1 !== undefined) ? parseInt(dim1) : null;
    dim2 = (dim2 !== null && dim2 !== undefined) ? parseInt(dim2) : null;

    const tmp = [dim1, dim2]; // Temporal array constant for iteration
    // Check if both dimensions are between 1px and 4000px
    for (let idx = 0; idx < tmp.length; idx += 1) {
        if (tmp[idx] !== null && tmp[idx] > 0 && tmp[idx] <= 4000) {
            message = 'correct';
        } else if (tmp[idx] !== null && (tmp[idx] <= 0 || tmp[idx] > 4000)) {
            message = (
                'Sorry, but each resolution must be between 1 and 4000'
                + '\nIf you have any questions, check the `resizing` command for more information'
            );
            break;
        } else if (tmp[idx] !== null && isNaN(tmp[idx])) {
            message = 'The resolution you sent is not a number, please try again 👺';
            break;
        }
    }
    return message;
};

module.exports = {
    randomToken, removeProcessedImage, validateResolution,
};
