const validateResolution = (dim1, dim2) => { // Needs refactor with Yup
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

module.exports = { validateResolution };
