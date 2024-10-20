//  MỤC ĐÍCH: KHÔNG CHỈNH CÁI GÌ , CHỈ ĐỂ XEM THÔNG TIN KHÁCH HÀNG !!!
import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { useLocation } from "react-router-dom";
import { getUserProfile, updateUserProfile, updateUserAddress } from "../api/customerApi"; // Import the API functions
import { fetchCustomers } from "../api/customerApi";
import '../styles/Profile.css'; // Create a new CSS file for specific styles

// Define interfaces for veterinarian data
interface CustomerAddress {
    district: string;
    city: string;
    ward: string;
    home_number: string;
}

interface CustomerData {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: CustomerAddress;
    image?: string; // Optional field for the customer's image
}

const CustomerDetails: React.FC = () => {
    const location = useLocation();
    const { user_id } = location.state; // Get veterinarian ID passed via state
    const [customerData, setcustomerData] = useState<CustomerData | null>(null);
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
        const fetchCustomersInfo = async () => {
            try {
                const customer = await getUserProfile(user_id); // Call API to get customer details
                setcustomerData(customer);
                setFirstname(customer.first_name || '');
                setLastname(customer.last_name || '');
                setPhone(customer.phone_number || '');
                setDistrict(customer.address?.district || '');
                setCity(customer.address?.city || '');
                setWard(customer.address?.ward || '');
                setHomeNumber(customer.address?.home_number || '');
                setSelectedImage(customer.image || null);
            } catch (error) {
                console.error('Failed to fetch customer data:', error);
            }
        };

        fetchCustomersInfo();
    }, [user_id]);

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

            await updateUserProfile(user_id, updatedProfileData); // Call the update profile API

            // Only update address if at least one field is filled
            const addressData = { district, city, ward, homeNumber };
            const anyAddressFieldFilled = [district, city, ward, homeNumber].some(field => field.trim() !== "");

            if (anyAddressFieldFilled) {
                await updateUserAddress(user_id, addressData); // Call the update address API
            }

            alert('Veterinarian profile updated successfully!');
        } catch (error) {
            console.error('Failed to update veterinarian data:', error);
        }
    };

    // Handle cancel action to reset form values to original state
    const handleCancel = () => {
        if (customerData) {
            setFirstname(customerData.first_name || '');
            setLastname(customerData.last_name || '');
            setPhone(customerData.phone_number || '');
            setDistrict(customerData.address?.district || '');
            setCity(customerData.address?.city || '');
            setWard(customerData.address?.ward || '');
            setHomeNumber(customerData.address?.home_number || '');
            setSelectedImage(customerData.image || null);
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
                                       value={customerData?.username || 'Loading...'} readOnly/>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Email</label>
                                <input
                                    type="email"
                                    className="form-control input-field"
                                    value={customerData?.email || ''} // Use empty string if customerData?.email is null
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

export default CustomerDetails;
