
import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { useAuth } from "../hooks/context/AuthContext";
import { getUserInfo, updateUserInfoAPI } from "../api/authService"; // Import authService functions
import { Link } from "react-router-dom";
import axios from 'axios';

// Define interfaces for user data
interface UserAddress {
    state: string;
    city: string;
    ward: string;
    homeNumber: string;
}

interface UserData {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    address: UserAddress;
}

const Profile: React.FC = () => {
    const { userId } = useAuth(); // Use Auth context to get userId
    const [userData, setUserData] = useState<UserData | null>(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [ward, setWard] = useState("");
    const [homeNumber, setHomeNumber] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorAddress, setErrorAddress] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Fetch user data from API on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                if (userId) {
                    const user = await getUserInfo(userId); // Call authService function
                    setUserData(user);
                    setFirstname(user.firstname || '');
                    setLastname(user.lastname || '');
                    setPhone(user.phone || '');
                    setState(user.address?.state || '');
                    setCity(user.address?.city || '');
                    setWard(user.address?.ward || '');
                    setHomeNumber(user.address?.homeNumber || '');
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, []);

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
        const addressFieldsFilled = [state, city, ward, homeNumber].some(field => field.trim() !== "");
        const allAddressFieldsFilled = [state, city, ward, homeNumber].every(field => field.trim() !== "");

        if (addressFieldsFilled && !allAddressFieldsFilled) {
            setErrorAddress("Please fill all address fields if you enter one.");
            return false;
        } else {
            setErrorAddress("");
            return true;
        }
    };

    // Handle saving updated user info
    const handleSave = async () => {
        const isAddressValid = validateAddress();
        if (!isAddressValid || errorPhone) return;

        try {
            const updatedData = {
                firstname,
                lastname,
                phone,
                address: {
                    state,
                    city,
                    ward,
                    homeNumber,
                },
            };

            const userId = sessionStorage.getItem('userId');
            if (userId) {
                await updateUserInfoAPI(userId, updatedData); // Use authService function
                alert('User data updated successfully!');
            }
        } catch (error) {
            console.error('Failed to update user data:', error);
        }
    };

    // Handle cancel action to reset form values to original state
    const handleCancel = () => {
        if (userData) {
            setFirstname(userData.firstname || '');
            setLastname(userData.lastname || '');
            setPhone(userData.phone || '');
            setState(userData.address?.state || '');
            setCity(userData.address?.city || '');
            setWard(userData.address?.ward || '');
            setHomeNumber(userData.address?.homeNumber || '');
        }
    };


    return (
        <div className="d-flex">
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

                                <input type="text" className="form-control input-field" value={userData?.username || 'Loading...'} readOnly />
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Email</label>
                                <input type="email" className="form-control input-field" value={userData?.email || 'Loading...'} readOnly />

                            </div>
                            <div className="name-row">
                                <div className="form-group">
                                    <label className="fw-bold">First Name</label>

                                    <input type="text" className="form-control input-field" value={firstname} onChange={e => setFirstname(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">Last Name</label>
                                    <input type="text" className="form-control input-field" value={lastname} onChange={e => setLastname(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Contact Number</label>
                                <input type="text" className="form-control input-field" value={phone} onChange={e => setPhone(e.target.value)} onBlur={validatePhone} />
                                {errorPhone && <div className="error-register">{errorPhone}</div>}
                            </div>
                            <div className="address-row">
                                <div className="form-group">
                                    <label className="fw-bold">State</label>
                                    <input type="text" className="form-control input-field" value={state} onChange={e => setState(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">City</label>
                                    <input type="text" className="form-control input-field" value={city} onChange={e => setCity(e.target.value)} />
                                </div>
                            </div>
                            <div className="address-row">
                                <div className="form-group">
                                    <label className="fw-bold">Ward</label>
                                    <input type="text" className="form-control input-field" value={ward} onChange={e => setWard(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">Home Number</label>
                                    <input type="text" className="form-control input-field" value={homeNumber} onChange={e => setHomeNumber(e.target.value)} />
                                </div>
                            </div>
                            {errorAddress && <div className="error-register">{errorAddress}</div>}
                            <div className="button-group">
                                <div className="left-buttons">
                                    <Link to="/password-change" className="change-password-btn">Change Password</Link>
                                </div>
                                <div className="right-buttons">
                                    <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                    <button type="button" className="save-btn" onClick={handleSave}>Save</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;