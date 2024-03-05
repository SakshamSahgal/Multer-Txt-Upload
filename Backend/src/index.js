require("dotenv").config()
const port = process.env.PORT || 8080
const { app } = require("./app");
const { upload, handleMulterError, handleTxtUpload, FileExists } = require("./multer");

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

// POST endpoint for file upload
app.post('/upload', upload.single('file'), handleMulterError, FileExists, handleTxtUpload);