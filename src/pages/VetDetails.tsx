import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { getUserInfo, updateUserInfoAPI } from "../api/authService"; // Adjust the import based on your service
import '../styles/Profile.css'; // You can reuse the same CSS or modify as needed

// Define interfaces for user data
interface UserAddress {
    state: string;
    city: string;
    ward: string;
    homeNumber: string;
}

interface VetData {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    address: UserAddress;
}

const VetDetails: React.FC = () => {
    const location = useLocation();
    const vetId = location.state?.vetId; // Get the vetId passed from the previous page
    const [vetData, setVetData] = useState<VetData | null>(null);
    const [errorPhone, setErrorPhone] = useState("");

    // Fetch veterinarian data from API on component mount
    useEffect(() => {
        const fetchVetData = async () => {
            try {
                if (vetId) {
                    const vet = await getUserInfo(vetId); // Call your API to fetch veterinarian data
                    setVetData(vet);
                }
            } catch (error) {
                console.error('Failed to fetch veterinarian data:', error);
            }
        };

        fetchVetData();
    }, [vetId]);

    // Validate phone number
    const validatePhone = () => {
        const phonePattern = /^[0-9]{10}$/;
        if (vetData?.phone && !phonePattern.test(vetData.phone)) {
            setErrorPhone("Contact number must be a 10-digit number.");
        } else {
            setErrorPhone("");
        }
    };

    // Handle saving updated veterinarian info
    const handleSave = async () => {
        // Validate phone number here if necessary
        const isPhoneValid = validatePhone();
        if (errorPhone) return;

        try {
            const updatedData = {
                firstname: vetData?.firstname,
                lastname: vetData?.lastname,
                phone: vetData?.phone,
                address: vetData?.address,
            };

            await updateUserInfoAPI(vetId, updatedData); // Use your update API function
            alert('Veterinarian data updated successfully!');
        } catch (error) {
            console.error('Failed to update veterinarian data:', error);
        }
    };

    if (!vetData) return <div>Loading...</div>; // Loading state

    return (
        <div className="d-flex profile-page">
            <Sidebar />
            <div className="flex-grow-1 bg-light" style={{ height: '100vh' }}>
                <div className="profile-container">
                    <div className="form-section">
                        <form className="profile-form">
                            <div className="form-group">
                                <label className="fw-bold">Username</label>
                                <input type="text" className="form-control input-field" value={vetData.username} readOnly />
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Email</label>
                                <input type="email" className="form-control input-field" value={vetData.email} readOnly />
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">First Name</label>
                                <input type="text" className="form-control input-field" value={vetData.firstname} onChange={e => setVetData({...vetData, firstname: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Last Name</label>
                                <input type="text" className="form-control input-field" value={vetData.lastname} onChange={e => setVetData({...vetData, lastname: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Contact Number</label>
                                <input type="text" className="form-control input-field" value={vetData.phone} onChange={e => setVetData({...vetData, phone: e.target.value})} onBlur={validatePhone} />
                                {errorPhone && <div className="error-register">{errorPhone}</div>}
                            </div>
                            {/* Address fields */}
                            <div className="address-row">
                                <div className="form-group">
                                    <label className="fw-bold">State</label>
                                    <input type="text" className="form-control input-field" value={vetData.address.state} onChange={e => setVetData({...vetData, address: {...vetData.address, state: e.target.value}})} />
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">City</label>
                                    <input type="text" className="form-control input-field" value={vetData.address.city} onChange={e => setVetData({...vetData, address: {...vetData.address, city: e.target.value}})} />
                                </div>
                            </div>
                            <div className="address-row">
                                <div className="form-group">
                                    <label className="fw-bold">Ward</label>
                                    <input type="text" className="form-control input-field" value={vetData.address.ward} onChange={e => setVetData({...vetData, address: {...vetData.address, ward: e.target.value}})} />
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">Home Number</label>
                                    <input type="text" className="form-control input-field" value={vetData.address.homeNumber} onChange={e => setVetData({...vetData, address: {...vetData.address, homeNumber: e.target.value}})} />
                                </div>
                            </div>
                            <div className="button-group">
                                <button type="button" className="save-btn" onClick={handleSave}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VetDetails;
