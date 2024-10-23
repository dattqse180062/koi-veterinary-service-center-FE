
import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { updateUserInfoAPI } from "../api/authService"; // Import authService functions
import { getStaffDetailsById } from "../api/staffApi";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../styles/Profile.css'

// Define interfaces for user data

interface StaffData {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    enable: string; // Thêm thuộc tính enabled
}

const StaffProfile: React.FC = () => {
    const location = useLocation();
    const { userId } = location.state;
    const [StaffData, setStaffData] = useState<StaffData | null>(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [enabled, setEnabled] = useState("1"); // Khởi tạo trạng thái enabled là "1"

    const navigate = useNavigate();

    // Fetch user data from API on component mount
    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const staff = await getStaffDetailsById(userId); // Call authService function
                setStaffData(staff);
                setFirstname(staff.first_name || '');
                setLastname(staff.last_name || '');
                setPhone(staff.phone_number || '');
                setEnabled(staff.enable || "1"); // Lấy trạng thái enabled từ dữ liệu
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchStaffData();
    }, [userId]);

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

    // Handle saving updated user info
    // const handleSave = async () => {
    //     if (errorPhone) return;
    //     try {
    //         const updatedData = {
    //             firstname,
    //             lastname,
    //             phone,
    //             enabled,
    //         };
    //         if (userId) {
    //             await updateUserInfoAPI(userId, updatedData); // Use authService function
    //             console.log("User StaffProfile updated successfully!");
    //             alert('User data updated successfully!');
    //         }
    //     } catch (error) {
    //         console.error('Failed to update user data:', error);
    //     }
    // };

    // Thêm vào hàm handleSave với cảnh báo

    const handleSave = async () => {
        if (errorPhone) return;

        // Hiển thị cảnh báo khi người dùng nhấn nút "Save"
        const isConfirmed = window.confirm("Are you sure you want to save changes? This action will update the user data.");

        if (!isConfirmed) {
            // Nếu người dùng chọn "Cancel" trong cảnh báo, dừng quá trình lưu
            return;
        }

        try {
            const updatedData = {
                first_name: firstname,
                last_name: lastname,
                phone_number: phone,
                enable: enabled, // Gửi trạng thái enabled cập nhật
            };
            if (userId) {
                await updateUserInfoAPI(userId, updatedData); // Use authService function
                console.log("User StaffProfile updated successfully!");
                alert('User data updated successfully!');
            }
        } catch (error) {
            console.error('Failed to update user data:', error);
        }
    };


    // Handle cancel action to reset form values to original state
    const handleCancel = () => {
        if (StaffData) {
            setFirstname(StaffData.first_name || '');
            setLastname(StaffData.last_name || '');
            setPhone(StaffData.phone_number || '');
            return;
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
                                <input type="text" className="form-control input-field" value={StaffData?.username || 'Loading...'} readOnly />
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Email</label>
                                <input type="email" className="form-control input-field" value={email || 'Loading...'} readOnly />
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

                            <div className="form-group">
                                <label className="fw-bold">Status</label>
                                <select
                                    className="form-control input-field"
                                    value={enabled}
                                    onChange={e => setEnabled(e.target.value)} // Cập nhật trạng thái enabled
                                >
                                    <option value="1">Enabled</option>
                                    <option value="0">Disabled</option>
                                </select>
                            </div>

                            <div className="button-group">
                                <div className="left-buttons">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => navigate(`/password-change`)}
                                    >
                                        Change Password
                                    </button>

                                    {/* <button type="button" className="btn btn-info" 
                                    onClick={toggleEnable}
                                    style={{marginTop:'6px'}}
                                    >
                                        Change status
                                    </button> */}
                                </div>
                                <div className="right-buttons">
                                    <button type="button" className="btn btn-dark" onClick={() => navigate(-1)}>Back</button>
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

export default StaffProfile;
