import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css'; 
function ImageUpload() {
    const [image, setImage] = useState(null);
    const [similarImages, setSimilarImages] = useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

//    const handleSubmit = async () => {
//        const formData = new FormData();
//        formData.append('image', image);
//
//        try {
//            const response = await axios.post('http://localhost:5000/find-similar-images', formData, {
//                headers: { 'Content-Type': 'multipart/form-data' }
//            });
//            setSimilarImages(response.data.similarImages);
//        } catch (error) {
//            console.error('Error finding similar images', error);
//        }
//    };

const handleSubmit = async () => {
    if (!image) {
        alert('Please select an image first.');
        return;
    }
    const formData = new FormData();
    formData.append('image', image);

    try {
        const response = await axios.post('http://localhost:5000/find-similar-images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setSimilarImages(response.data.similarImages);
    } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to find similar images.');
    }
};


    return (
        <div className="upload-container">
            <h1 className="header">Visual Search Engine </h1>
            <p className="subheader">Upload a clothing item and find similar product instantly!</p>

            <div className="upload-box">
                <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
                <button onClick={handleSubmit} className="upload-btn">Find Similar Product</button>
            </div>

            <div className="results">
                {similarImages.length > 0 ? (
                    similarImages.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image} alt={`Similar ${index + 1}`} className="similar-image" />
                        </div>
                    ))
                ) : (
                    <p className="no-results">No similar images found. Try another image!</p>
                )}
            </div>
        </div>
    );
}

export default ImageUpload;
