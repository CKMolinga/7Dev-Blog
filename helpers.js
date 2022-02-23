const imageFilter = function(req, file, callback) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFilter = imageFilter;