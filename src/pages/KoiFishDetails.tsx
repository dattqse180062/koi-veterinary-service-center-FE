import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getKoiById, updateKoi, deleteKoi } from '../api/koiApi';
import '../styles/AddKoiFish.css';
import axios from 'axios';

const KoiDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fishId: number = location.state?.fishId; // Get fishId from state
    const [initialKoiData, setInitialKoiData] = useState({
        species: '',
        age: '',
        gender: '',
        size: '',
        weight: '',
        color: '',
        origin: '',
    });

    const [koiData, setKoiData] = useState(initialKoiData);
    const [imagePaths, setImagePaths] = useState<string[]>([]);
    const [showAllImages, setShowAllImages] = useState(false); // Control visibility of all uploaded images

    useEffect(() => {
        const fetchKoiData = async () => {
            if (fishId) {
                const data = await getKoiById(fishId.toString());
                setKoiData(data);
                setInitialKoiData(data); // Store initial data for cancel button
                // Fetch image paths based on fish ID if needed
                // Assuming an API endpoint exists to get images for a specific fish
                const imagesResponse = await axios.get(`https://66febd102b9aac9c997d2e78.mockapi.io/api/koi-image`);
                setImagePaths(imagesResponse.data.map((image: any) => image.source_path));
            }
        };
        fetchKoiData();
    }, [fishId]);

    const handleUpdate = async () => {
        if (Object.values(koiData).some(value => value === '')) {
            alert('Please fill in all fields!');
            return;
        }
        try {
            await updateKoi(fishId, koiData);
            alert('Koi updated successfully!');
        } catch (error) {
            console.error('Error updating koi:', error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this koi?');
        if (confirmDelete) {
            try {
                await deleteKoi(fishId);
                alert('Koi deleted successfully!');
                navigate('/koi');
            } catch (error) {
                console.error('Error deleting koi:', error);
            }
        }
    };

    const handleBack = () => {
        navigate('/koi');
    };

    const handleCancel = () => {
        setKoiData(initialKoiData);
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
                {/* Image Section */}
                <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center mb-4" style={{ marginTop: "6rem" }}>
                    <div className="image-upload-container">
                        <div className="image-upload-card">
                            {imagePaths.length > 0 && (
                                <img src={imagePaths[0]} className="image-upload" alt="Koi" />
                            )}
                        </div>
                        <div className="upload-button-container text-center mt-3">
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
                <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "3.5rem" }}>
                    <div className="form-container card w-100">
                        <div className="card-body">
                            {/* Species */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Species</label>
                                <input type="text" name="species" className="form-control input-field-koi"
                                       value={koiData.species} onChange={(e) => setKoiData({ ...koiData, species: e.target.value })} />
                            </div>

                            {/* Age and Gender */}
                            <div className="mb-3 row">
                                <div className="col-md-4 col-sm-6">
                                    <label className="form-label text-secondary">Age</label>
                                    <input type="number" name="age" className="form-control input-field-koi"
                                           value={koiData.age} onChange={(e) => setKoiData({ ...koiData, age: e.target.value })} />
                                </div>
                                <div className="col-md-8 col-sm-6 d-flex align-items-end gap-3 mt-2">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" value="MALE" checked={koiData.gender === 'MALE'}
                                               onChange={(e) => setKoiData({ ...koiData, gender: e.target.value })} />
                                        <label className="form-check-label" htmlFor="male">Male</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" value="FEMALE" checked={koiData.gender === 'FEMALE'}
                                               onChange={(e) => setKoiData({ ...koiData, gender: e.target.value })} />
                                        <label className="form-check-label" htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>

                            {/* Size */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Size</label>
                                <input type="text" name="size" className="form-control input-field-koi"
                                       value={koiData.size} onChange={(e) => setKoiData({ ...koiData, size: e.target.value })} />
                            </div>

                            {/* Weight */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Weight</label>
                                <input type="text" name="weight" className="form-control input-field-koi"
                                       value={koiData.weight} onChange={(e) => setKoiData({ ...koiData, weight: e.target.value })} />
                            </div>

                            {/* Color */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Color</label>
                                <input type="text" name="color" className="form-control input-field-koi"
                                       value={koiData.color} onChange={(e) => setKoiData({ ...koiData, color: e.target.value })} />
                            </div>

                            {/* Origin */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Origin</label>
                                <input type="text" name="origin" className="form-control input-field-koi"
                                       value={koiData.origin} onChange={(e) => setKoiData({ ...koiData, origin: e.target.value })} />
                            </div>

                            {/* Action Buttons */}
                            <div className="d-flex gap-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
                                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KoiDetail;
