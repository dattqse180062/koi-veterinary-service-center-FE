import React,{useState} from 'react';
import Sidebar from '../components/layout/Sidebar'; // Adjust the import path as needed
import '../styles/Profile.css';

const ProfilePage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const[password, setPassword] = useState("");

    //cac bien bao loi
    const[errorMatKhau, setErrorMatKhau] = useState("");


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    //Kiem Tra Mat Khau///////////////////////////////////////////////////////////////////////////////////////////
    const kiemMatKhau = (password: string) =>{
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if(!passwordRegex.test(password)){
            setErrorMatKhau("Password must be at least 8 chars with a special char!");
            return true;
        }else {
            setErrorMatKhau(""); //mat khau hop le
            return false;
        }
    }

    const handleMatKhauChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        //Thay doi gia tri
        setPassword(e.target.value);
        if (e.target.value.length > 0) {
            kiemMatKhau(e.target.value);
        } else {
            setErrorMatKhau(""); // Không hiển thị lỗi nếu chưa nhập
        }

    }
///////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 bg-light" style={{height: '100vh'}}>
                <div className="profile-container">
                    <div className="image-section">
                        <div className="image-background">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Uploaded" className="uploaded-image"/>
                            ) : (
                                <div className="image-placeholder">No Image
                                    Selected</div>
                                )}
                        </div>
                        <label className="upload-btn">
                            {selectedImage ? "Change Image" : "Choose image"} {/* Change this text accordingly */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{display: 'none'}} // Hide the actual input
                            />
                        </label>
                        <button className="upload-btn" style={{width:"100px"}}>Save</button>
                    </div>
                    <div className="form-section">
                        <form className="profile-form">
                            <div className="form-group">
                                <label className="fw-bold">Username</label>
                                <input type="username" className="input-field"/>
                            </div>
                            <div className="name-row">
                                <div className="form-group">
                                    <label className="fw-bold">First Name</label>
                                    <input type="text" className="input-field"/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">Last Name</label>
                                    <input type="text" className="input-field"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Email</label>
                                <input type="email" className="input-field"/>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Contact Number</label>
                                <input type="text" className="input-field"/>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Address</label>
                                <textarea className="input-field"></textarea>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Password</label>
                                <input type="password" className="input-field"/>
                            </div>
                            <div className="form-group">

                                    <label htmlFor="matKhau" className="fw-bold"
                                    >New Password</label>
                                    <input type="password"
                                           id="matKhau"
                                           className="input-field"
                                           value={password}
                                           placeholder="Enter your new password"
                                        // onChange={handleMatKhauChange}
                                           onChange={(e) => setPassword(e.target.value)}
                                           onBlur={handleMatKhauChange}

                                    />
                                    {errorMatKhau && ( // Kiểm tra có lỗi hay không
                                        <div className="error-register" >
                                            {errorMatKhau}
                                        </div>
                                    )}

                            </div>
                            <div className="button-group">
                                <button type="button" className="cancel-btn">Cancel</button>
                                <button type="submit" className="save-btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
        ;
};

export default ProfilePage;