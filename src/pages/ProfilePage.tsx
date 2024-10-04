import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { useAuth } from "../hooks/context/AuthContext";
import { getUserInfo, updateUserInfoAPI } from "../api/authService"; // Import the update function
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
const API_URL = 'https://66e10816c831c8811b538fae.mockapi.io/api';
const Profile: React.FC = () => {
    const { userId } = useAuth();
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                if (userId) {
                    const response = await axios.get(`${API_URL}/login?id=${userId}`);
                    const user = response.data[0]; // Giả định API trả về mảng có 1 phần tử
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

    const validatePhone = () => {
        // Validate phone number length to be 10 digits and numeric only if not empty
        const phonePattern = /^[0-9]{10}$/;
        if (phone.trim() !== "" && !phonePattern.test(phone)) {
            setErrorPhone("Contact number must be a 10-digit number.");
        } else {
            setErrorPhone("");
        }
    };

    const validateAddress = () => {
        // Allow empty fields but require all to be filled if any is filled
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

    const handleSave = async () => {
        const isAddressValid = validateAddress();
        if (!isAddressValid || errorPhone) return; // Kiểm tra lỗi trước khi gửi request

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

            // Gửi yêu cầu PUT để cập nhật thông tin người dùng
            await axios.put(`https://66e10816c831c8811b538fae.mockapi.io/api/login?id=${userId}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error: any) {
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else {
                console.error('Error message:', error.message);
            }
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
                                <input type="text" className="input-field" value={userData?.username || 'Loading...'}
                                       readOnly/>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Email</label>
                                <input type="email" className="input-field" value={userData?.email || 'Loading...'}
                                       readOnly/>
                            </div>
                            <div className="name-row">
                                <div className="form-group">
                                    <label className="fw-bold">First Name</label>
                                    <input type="text" className="input-field" value={firstname}
                                           onChange={e => setFirstname(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">Last Name</label>
                                    <input type="text" className="input-field" value={lastname}
                                           onChange={e => setLastname(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Contact Number</label>
                                <input type="text" className="input-field" value={phone}
                                       onChange={e => setPhone(e.target.value)} onBlur={validatePhone}/>
                                {errorPhone && <div className="error-register">{errorPhone}</div>}
                            </div>
                            <div className="address-row">
                                <div className="form-group">
                                    <label className="fw-bold">State</label>
                                    <input type="text" className="input-field" value={state}
                                           onChange={e => setState(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">City</label>
                                    <input type="text" className="input-field" value={city}
                                           onChange={e => setCity(e.target.value)}/>
                                </div>
                            </div>
                            <div className="address-row">
                                <div className="form-group">
                                    <label className="fw-bold">Ward</label>
                                    <input type="text" className="input-field" value={ward}
                                           onChange={e => setWard(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">Home Number</label>
                                    <input type="text" className="input-field" value={homeNumber}
                                           onChange={e => setHomeNumber(e.target.value)}/>
                                </div>
                            </div>
                            {errorAddress && <div className="error-register">{errorAddress}</div>}
                            <div className="button-group">
                                <div className="left-buttons">
                                    <Link to="/password-change" className="change-password-btn">Change Password</Link>
                                </div>
                                <div className="right-buttons">
                                    <button type="button" className="cancel-btn">Cancel</button>
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
