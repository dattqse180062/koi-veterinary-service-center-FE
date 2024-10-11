import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { useLocation } from "react-router-dom";
import { getUserProfile, updateUserProfile, updateUserAddress } from "../api/vetApi"; // Import the API functions
import '../styles/Profile.css'; // Create a new CSS file for specific styles

// Define interfaces for veterinarian data
interface VetAddress {
    district: string;
    city: string;
    ward: string;
    home_number: string;
}

interface VetData {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: VetAddress;
    image?: string; // Optional field for the veterinarian's image
}

const VetDetails: React.FC = () => {
    const location = useLocation();
    const { vetId } = location.state; // Get veterinarian ID passed via state
    const [vetData, setVetData] = useState<VetData | null>(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [ward, setWard] = useState("");
    const [homeNumber, setHomeNumber] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorAddress, setErrorAddress] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Fetch veterinarian data from API on component mount
    useEffect(() => {
        const fetchVetData = async () => {
            try {
                const vet = await getUserProfile(vetId); // Call API to get vet details
                setVetData(vet);
                setFirstname(vet.first_name || '');
                setLastname(vet.last_name || '');
                setPhone(vet.phone_number || '');
                setDistrict(vet.address?.district || '');
                setCity(vet.address?.city || '');
                setWard(vet.address?.ward || '');
                setHomeNumber(vet.address?.home_number || '');
                setSelectedImage(vet.image || null);
            } catch (error) {
                console.error('Failed to fetch veterinarian data:', error);
            }
        };

        fetchVetData();
    }, [vetId]);

    // Handle image upload
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Validate phone number
    const validatePhone = () => {
        const phonePattern = /^[0-9]{10}$/;
        if (phone.trim() !== "" && !phonePattern.test(phone)) {
            setErrorPhone("Contact number must be a 10-digit number.");
        } else {
            setErrorPhone("");
        }
    };

    // Validate address fields
    const validateAddress = () => {
        const addressFieldsFilled = [district, city, ward, homeNumber].some(field => field.trim() !== "");
        const allAddressFieldsFilled = [district, city, ward, homeNumber].every(field => field.trim() !== "");

        if (addressFieldsFilled && !allAddressFieldsFilled) {
            setErrorAddress("Please fill all address fields if you enter one.");
            return false;
        } else {
            setErrorAddress("");
            return true;
        }
    };

    // Handle saving updated veterinarian profile and address info
    const handleSave = async () => {
        validatePhone();
        const isAddressValid = validateAddress();

        if (errorPhone || !isAddressValid) return; // Ensure no validation errors

        try {
            const updatedProfileData = {
                firstname,
                lastname,
                phone,
                image: selectedImage, // Include image if uploaded
            };

            await updateUserProfile(vetId, updatedProfileData); // Call the update profile API

            // Only update address if at least one field is filled
            const addressData = { district, city, ward, homeNumber };
            const anyAddressFieldFilled = [district, city, ward, homeNumber].some(field => field.trim() !== "");

            if (anyAddressFieldFilled) {
                await updateUserAddress(vetId, addressData); // Call the update address API
            }

            alert('Veterinarian profile updated successfully!');
        } catch (error) {
            console.error('Failed to update veterinarian data:', error);
        }
    };

    // Handle cancel action to reset form values to original state
    const handleCancel = () => {
        if (vetData) {
            setFirstname(vetData.first_name || '');
            setLastname(vetData.last_name || '');
            setPhone(vetData.phone_number || '');
            setDistrict(vetData.address?.district || '');
            setCity(vetData.address?.city || '');
            setWard(vetData.address?.ward || '');
            setHomeNumber(vetData.address?.home_number || '');
            setSelectedImage(vetData.image || null);
        }
    };

    return (
        <div className="d-flex profile-page">
            <Sidebar />
            <div className="flex-grow-1 bg-light" style={{ height: '100vh' }}>
                <div className="profile-container">
                    <div className="image-section">
                        <div className="image-background">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Uploaded" className="uploaded-image" />
                            ) : (
                                <div className="image-placeholder">No Image Selected</div>
                            )}
                        </div>
                        <label className="upload-btn">
                            {selectedImage ? "Change Image" : "Choose Image"}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                    <div className="form-section">
                        <form className="profile-form">
                            <div className="form-group">
                                <label className="fw-bold">Username</label>
                                <input type="text" className="form-control input-field"
                                       value={vetData?.username || 'Loading...'} readOnly/>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Email</label>
                                <input
                                    type="email"
                                    className="form-control input-field"
                                    value={vetData?.email || ''} // Use empty string if vetData?.email is null
                                    placeholder="Enter your email" // Add placeholder text
                                    readOnly // Keep the field read-only
                                />
                            </div>
                            <div className="name-row">
                                <div className="form-group">
                                    <label className="fw-bold">First Name</label>
                                    <input type="text" className="form-control input-field" value={firstname}
                                           onChange={e => setFirstname(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">Last Name</label>
                                    <input type="text" className="form-control input-field" value={lastname}
                                           onChange={e => setLastname(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Contact Number</label>
                                <input type="text" className="form-control input-field" value={phone}
                                       onChange={e => setPhone(e.target.value)} onBlur={validatePhone}/>
                                {errorPhone && <div className="error-register">{errorPhone}</div>}
                            </div>

                            <div className="address-row">
                                <div className="form-group">
                                    <label className="fw-bold">District</label>
                                    <input type="text" className="form-control input-field" value={district}
                                           onChange={e => setDistrict(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">City</label>
                                    <input type="text" className="form-control input-field" value={city}
                                           onChange={e => setCity(e.target.value)}/>
                                </div>
                            </div>
                            <div className="address-row">
                                <div className="form-group">
                                    <label className="fw-bold">Ward</label>
                                    <input type="text" className="form-control input-field" value={ward}
                                           onChange={e => setWard(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">Home Number</label>
                                    <input type="text" className="form-control input-field" value={homeNumber}
                                           onChange={e => setHomeNumber(e.target.value)}/>
                                </div>
                            </div>
                            {errorAddress && <div className="error-register">{errorAddress}</div>}
                            <div className="button-group">
                                <div className="right-buttons">
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VetDetails;
