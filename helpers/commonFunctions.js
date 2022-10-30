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
    /* Returns the sharp config as dicts for 'compose' (size and posicion) */
    /* The configurations are for the frontal img */
    const sizeConfig = {
        small: 0.3,
        mid: 0.65,
        big: 1.35,
    };
    const positionConfig = {
        n: 'top',
        e: 'right',
        s: 'bot',
        w: 'left',
        nw: 'left top',
        ne: 'right top',
        se: 'left bot',
        sw: 'right bot',
    };

    return [sizeConfig[size], positionConfig[position]];
};

const composeOptions = (options) => {
    /* Validates the msg options for the 'compose' command, and sends to process */
    const size = ['small', 'mid', 'big'].includes(options[0]) ? options[0] : options[1];
    const position = [
        'n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw'].includes(options[0]) ? options[0] : options[1];
    return processComposeOptions(size, position);
};

module.exports = { validateResolution, composeOptions };
