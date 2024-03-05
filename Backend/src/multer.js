const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination directory for uploaded files
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        // Set the filename of uploaded files
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Multer file filter configuration(but this wont be called if the no file is uploaded, so we need to check if the file exists in the FileExists middleware function)
const fileFilter = (req, file, cb) => {
    // Filter files based on mimetype to only allow .txt files
    console.log("checking file type in file filter")

    if (file.mimetype === 'text/plain') {
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file
        cb(new Error('Only .txt files are allowed.'));
    }
};


// Multer middleware configuration
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5000000 } // 5 MB file size limit 
});

// MulterErrorHandeller Middleware
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer error (e.g., file size limit exceeded)
        return res.json({
            success: false,
            message: err.message
        });
    }
    else if (err) {
        return res.json({
            success: false,
            message: err.message
        });
    }
    next();
};

const FileExists = (req, res, next) => {
    console.log("checking if file exists")
    if (req.file) {
        console.log("file exists")
        next()
    } else {
        console.log("file does not exist")
        return res.json({
            success: false,
            message: "No file found"
        });
    }
}

// Function to handle the upload of .txt files
function handleTxtUpload(req, res) {
    console.log(req.file);

    //write the file to the uploads directory
    res.status(200).send({
        success: true,
        message: 'File uploaded successfully'
    });
}


module.exports = { upload, handleTxtUpload, handleMulterError, FileExists };