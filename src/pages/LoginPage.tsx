import React, { useState } from "react";
import backgroundImage from "../assets/images/background.jpg";
import googleIcon from "../assets/images/flat-color-icons_google.svg";
import Navbar from "../components/layout/Navbar";
import {Link} from "react-router-dom";
import { login as apiLogin } from '../api/authService';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../hooks/context/AuthContext";
import "../styles/LoginRegister.css"
export default function DangNhapNguoiDung() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page refresh
        setErrorMessage("");

        console.log("Attempting to log in with username:", username); // Log username

        try {
            const user = await apiLogin(username, password);
            console.log("User logged in:", user); // Log user information

            localStorage.setItem('token', user.id);
            localStorage.setItem('role', user.roles);

            // Gọi hàm login từ context
            login(user.id); // Gọi hàm login từ context để cập nhật trạng thái
            console.log("isLoggedIn updated to true"); // Log trạng thái đăng nhập

            if (user.roles === 'admin') {
                navigate('/secret');
            } else {
                navigate('/');
            }
        } catch (err) {
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            console.error("Login error:", err); // Log lỗi
        }
    };



    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center min-vh-100"
            style={{
                backgroundImage: `url(${backgroundImage})`, // Đổi URL thành hình nền bạn muốn
                backgroundSize: "cover", // Đảm bảo hình nền bao phủ toàn bộ
                backgroundPosition: "center", // Căn giữa hình nền
                height: "100vh", // Đặt chiều cao của div là toàn màn hình
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >

            <div
                className="card border-1 rounded-4 p-4 mt-5"
                style={{
                    maxWidth: "70vw", // Responsive max width relative to viewport width
                    width: "385px",
                    height:"490px",
                    background: "rgba(193, 151, 88, 0.25)", // Semi-transparent orange background
                    backdropFilter: "blur(2px)", // Apply blur effect
                    borderColor: "#c69533", //
                    boxShadow: '4px 10px 20px rgba(0, 0, 0, 0.25)'
                }}
            >
                <div className="card-body mx-2">
                    {/* Title */}
                    <h3 className="card-title card-title-cus"
                        >Login</h3>

                    {/* Username Input */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <div className="d-flex flex-column align-items-start">
                                <label htmlFor="tenDangNhap" className="form-label "
                                       >Username</label>
                                <input
                                    type="text"
                                    id="tenDangNhap"
                                    className="form-control custom-placeholder"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}

                                />
                            </div>
                            </div>

                            {/* Password Input */}
                        <div className="mb-3">
                            <div className="d-flex flex-column align-items-start">
                                <label htmlFor="matKhau" className="form-label "
                                       >Password</label>

                                <input
                                    type="password"
                                    id="matKhau"
                                    className="form-control custom-placeholder"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                            </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="d-flex justify-content-end mb-3">
                                <a href="#" className="text-white  fw-bold" style={{fontSize: '0.875rem'}}>Forgot
                                    Password?</a>
                            </div>

                            {/* Sign In Button */}
                        {/*{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}*/}
                            <div className="d-grid mb-3">

                                <button type="submit" className="btn btn-primary fw-bold"
                                        style={{backgroundColor: '#c19758', fontSize: '0.8rem', padding: '0.5rem',borderColor: "#c69533",}}>Sign
                                    in
                                </button>
                            </div>

                            {/* Or continue with */}
                            <p className="text-center text-white fw-bold mb-3" style={{fontSize: '0.875rem'}}>or
                                continue with</p>

                            {/* Social Buttons */}
                            <div className="d-flex justify-content-center gap-3 mb-3">
                                <button className="btn btn-outline-secondary"
                                        style={{backgroundColor: 'white',
                                            border: '1px solid #bcbcc0', // Light border color
                                            borderRadius: '5px',
                                            fontSize: '0.875rem',
                                            padding: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',}}>
                                    <img src={googleIcon} alt="Google" style={{width: '35px', height: '20px'}}/>
                                </button>
                                {/* Add more social buttons similarly */}
                            </div>
                    </form>
                    {/* Register Link */}
                        <p className="text-center text-white fw-bold" style={{ fontSize: '0.875rem' }}>
                            Don’t have an account yet? <Link className="text-warning" to="/dangky">Register for free</Link>
                            {/*<a href="#"*/}
                            {/*                                                                        className="text-warning">Register*/}
                            {/*for free</a>*/}


                        </p>
                </div>
            </div>
        </div>
    );
}
