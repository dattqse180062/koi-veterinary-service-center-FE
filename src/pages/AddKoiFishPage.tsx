import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddKoiFish.css';

const AddKoiFish: React.FC = () => {
    const [koiData, setKoiData] = useState({
        species: '',
        age: '',
        gender: '',
        size: '',
        weight: '',
        color: '',
        origin: '',
        userId: 101, // example user ID
    });
    const [images, setImages] = useState<File[]>([]);
    const [imagePaths, setImagePaths] = useState<string[]>([]);
    const [showAllImages, setShowAllImages] = useState(false); // State to control visibility of all uploaded images

    // Handle input changes for koi data
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setKoiData({ ...koiData, [name]: value });
    };

    // Handle image uploads
    const handleImageUpload = async (files: FileList | null) => {
        if (!files) return;

        const uploadedImagePaths: string[] = [];
        const selectedImages = Array.from(files);

        // Set the selected images for preview
        setImages(selectedImages);

        for (const file of selectedImages) {
            try {
                const formData = new FormData();
                formData.append('file', file);

                // Post image to API
                const response = await axios.post('https://66febd102b9aac9c997d2e78.mockapi.io/api/koi-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                uploadedImagePaths.push(response.data.source_path); // Assuming the API returns image path
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        setImagePaths(uploadedImagePaths);
    };

    // Submit koi form data and images
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!koiData.species || !koiData.age || !koiData.gender || !koiData.size || !koiData.weight || !koiData.color || !koiData.origin) {
            alert('Please fill in all fields!');
            return;
        }

        try {
            // Post koi information
            const fishResponse = await axios.post('https://66fa1da4afc569e13a9a726b.mockapi.io/api/koi', {
                ...koiData,
                fish_id: Math.floor(Math.random() * 1000), // Assuming fish_id is auto-generated
            });

            const fishId = fishResponse.data.fish_id;

            // Post image paths to koi-image API
            for (const path of imagePaths) {
                await axios.post('https://66febd102b9aac9c997d2e78.mockapi.io/api/koi-image', {
                    source_path: path,
                    fish_id: fishId,
                    image_id: Math.floor(Math.random() * 1000), // Assuming image_id is auto-generated
                });
            }

            alert('Koi data and images successfully submitted!');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleBack = () => {
        // Logic to navigate back, for example, using a history push if you're using react-router
        window.history.back();
    };

    // Function to toggle image visibility
    const toggleImages = () => {
        setShowAllImages(!showAllImages);
    };

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center ">
            <button className="btn btn-secondary back-button" onClick={handleBack}>
                Back
            </button>
            <div className="row w-100 h-100">
                {/* Image Upload Section */}
                <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center mb-4" style={{marginTop:"6rem"}}>
                    <div className="image-upload-container">
                        <div className="image-upload-card">
                            {imagePaths.length > 0 && (
                                <img src={imagePaths[0]} className="image-upload" alt="Koi" />
                            )}
                        </div>
                        <div className="upload-button-container text-center mt-3">
                            <input type="file" multiple onChange={(e) => handleImageUpload(e.target.files)} />
                            <button className="upload-button btn btn-warning text-white" onClick={toggleImages}>
                                {showAllImages ? 'Hide All Images' : 'Show All Images'}
                            </button>
                        </div>
                        {showAllImages && imagePaths.length > 1 && (
                            <div className="uploaded-images mt-3">
                                {imagePaths.slice(1).map((path, index) => (
                                    <img key={index} src={path} className="image-upload" alt={`Uploaded ${index + 1}`} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Section */}
                <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center  " style={{marginTop:"3.5rem"}}>
                    <div className="form-container card w-100">
                        <div className="card-body">
                            {/* Species */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Species</label>
                                <input type="text" name="species" className="form-control input-field"
                                       placeholder="Enter your koi species" onChange={handleInputChange} />
                            </div>

                            {/* Age and Gender */}
                            <div className="mb-3 row">
                                <div className="col-md-4 col-sm-6">
                                    <label className="form-label text-secondary">Age</label>
                                    <input type="number" name="age" className="form-control input-field"
                                           placeholder="Enter koi age" onChange={handleInputChange} />
                                </div>
                                <div className="col-md-8 col-sm-6 d-flex align-items-end gap-3 mt-2">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" value="male" id="male" onChange={handleInputChange} />
                                        <label className="form-check-label" htmlFor="male">Male</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" value="female" id="female" onChange={handleInputChange} />
                                        <label className="form-check-label" htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>

                            {/* Size */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Size</label>
                                <input type="text" name="size" className="form-control input-field"
                                       placeholder="Enter your koi size (width/height)" onChange={handleInputChange} />
                            </div>

                            {/* Weight */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Weight</label>
                                <input type="text" name="weight" className="form-control input-field"
                                       placeholder="Enter your koi weight" onChange={handleInputChange} />
                            </div>

                            {/* Color */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Color</label>
                                <input type="text" name="color" className="form-control input-field"
                                       placeholder="Enter your koi color" onChange={handleInputChange} />
                            </div>

                            {/* Origin */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Origin</label>
                                <input type="text" name="origin" className="form-control input-field"
                                       placeholder="Enter your koi origin" onChange={handleInputChange} />
                            </div>

                            {/* Submit Button */}
                            <div className="d-grid">
                                <button className="btn btn-primary submit-button" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddKoiFish;
