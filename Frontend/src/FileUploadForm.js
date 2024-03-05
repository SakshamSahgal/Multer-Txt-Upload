// FileUploadForm.js

import { useState } from 'react';
import axios from 'axios';

const FileUploadForm = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        // if (selectedFile && selectedFile.type === 'text/plain') {
            setFile(selectedFile);
        // } else {
        //     alert('Please select a .txt file.');
        //     setFile(null);
        // }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!file) {
        //     alert('Please select a .txt file.');
        //     return;
        // }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('File uploaded successfully!', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default FileUploadForm;
