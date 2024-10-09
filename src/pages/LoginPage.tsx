import React, { useState , useEffect} from "react";
import backgroundImage from "../assets/images/background.jpg";
import googleIcon from "../assets/images/flat-color-icons_google.svg";
import Navbar from "../components/layout/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { login as apiLogin } from '../api/authService';
import { useAuth } from "../hooks/context/AuthContext";
import "../styles/LoginRegister.css";
import axios from  "axios"


const DangNhapNguoiDung: React.FC = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // useEffect(() => {
    //     // Check if user is already logged in
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         login(token); // Set the token in context
    //         navigate('/'); // Redirect to home if already logged in
    //     }
    // }, [login, navigate]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/users/token', { username, password });
            const token = response.data.result.token;
            login(token);  // Lưu JWT sau khi đăng nhập
            navigate('/');  // Chuyển hướng sau khi đăng nhập thành công
        } catch (err) {
            setErrorMessage('Login failed.');
        }
    };

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center min-vh-100"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
            }}
        >
            <div
                className="card border-1 rounded-4 p-4 mt-5"
                style={{
                    maxWidth: "70vw",
                    width: "385px",
                    height: "490px",
                    background: "rgba(193, 151, 88, 0.25)",
                    backdropFilter: "blur(2px)",
                    borderColor: "#c69533",
                    boxShadow: '4px 10px 20px rgba(0, 0, 0, 0.25)',
                }}
            >
                <div className="card-body mx-2">
                    {/* Title */}
                    <h3 className="card-title card-title-cus">Login</h3>

                    {/* Username Input */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <div className="d-flex flex-column align-items-start">
                                <label htmlFor="tenDangNhap" className="form-label">Username</label>
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
                                <label htmlFor="matKhau" className="form-label">Password</label>
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
                            <a href="#" className="text-white fw-bold" style={{ fontSize: '0.875rem' }}>Forgot Password?</a>
                        </div>

                        {/* Sign In Button */}
                        {errorMessage && <div className="text-danger" style={{marginTop:"-15px"}}>{errorMessage}</div>} {/* Show error message if exists */}
                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-primary fw-bold"
                                    style={{ backgroundColor: '#c19758', fontSize: '0.8rem', padding: '0.5rem', borderColor: "#c69533" }}>
                                Sign in
                            </button>
                        </div>

                        {/* Or continue with */}
                        <p className="text-center text-white fw-bold mb-3" style={{ fontSize: '0.875rem' }}>or continue with</p>

                        {/* Social Buttons */}
                        <div className="d-flex justify-content-center gap-3 mb-3">
                            <button className="btn btn-outline-secondary"
                                    style={{
                                        backgroundColor: 'white',
                                        border: '1px solid #bcbcc0',
                                        borderRadius: '5px',
                                        fontSize: '0.875rem',
                                        padding: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                <img src={googleIcon} alt="Google" style={{ width: '35px', height: '20px' }} />
                            </button>
                            {/* Add more social buttons similarly */}
                        </div>
                    </form>

                    {/* Register Link */}
                    <p className="text-center text-white fw-bold" style={{ fontSize: '0.875rem' }}>

                        Don’t have an account yet? <Link className="text-warning" to="/register">Register for free</Link>

                    </p>
                </div>
            </div>
        </div>
    );
}
export default DangNhapNguoiDung;