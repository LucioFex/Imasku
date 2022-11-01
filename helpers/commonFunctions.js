const validateResolution = (dim1, dim2) => {
    /*
    Returns 'correct' if the given width and/or height are a
    'number' (not NaN), greater than 0 and less than or equal to 4000
    */

    // Check if both dimensions are between 1px and 4000px
    const tmp = [parseInt(dim1), parseInt(dim2)];
    for (let idx = 0; idx < tmp.length; idx += 1) {
        if (tmp[idx] > 0 && tmp[idx] <= 4000) {
            return 'correct';
        } if (tmp[idx] <= 0 || tmp[idx] > 4000) {
            return (
                'Sorry, but each resolution must be between 1 and 4000'
                + '\nIf you have any questions, check the `resizing` command for more information'
            );
        }
    }

    // In case both dimensions are 'NaN'
    return 'You need to send a resolution, please try again  👀';
};

const processComposeOptions = (size, position) => {
    /* Returns the sharp config as dicts for 'compose' (size and gravity) */
    /* The configurations are for the frontal img */
    const sizeConfig = {
        small: 0.35,
        mid: 0.65,
        big: 0.8,
    };

    const gravityConfig = {
        n: 'north',
        e: 'east',
        s: 'south',
        w: 'west',
        nw: 'northwest',
        ne: 'northeast',
        se: 'southeast',
        sw: 'northwest',
    };

    return [sizeConfig[size], gravityConfig[position]];
};

const composeOptions = (options) => {
    /* Validates the msg options for the 'compose' command, and sends to process */
    const size = ['small', 'mid', 'big'].includes(options[0]) ? options[0] : options[1];
    const gravity = [
        'n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw'].includes(options[0]) ? options[0] : options[1];
    return processComposeOptions(size, gravity);
};

module.exports = { validateResolution, composeOptions };
