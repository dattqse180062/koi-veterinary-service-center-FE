import React, {useState} from "react";
import backgroundImage from "../assets/images/background.jpg";
import Navbar from "../components/layout/Navbar";
import {register} from "../api/authService";
import "../styles/LoginRegister.css";
export default function RegisterPage(){
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[email, setEmail] = useState("");
    //cac bien bao loi
    const[errorTenDangNhap, setErrorTenDangNhap] = useState("");
    const[errorEmail, setErrorEmail] = useState("");
    const[errorMatKhau, setErrorMatKhau] = useState("");
    const[errorMatKhauNhapLai, setErrorMatKhauNhapLai] = useState("");


    //Xu Ly thong tin
    const handleSubmit = async (e: React.FormEvent) =>{
        //Clear any previous error message
        setErrorTenDangNhap("");
        setErrorEmail("");
        setErrorMatKhau("");
        setErrorMatKhauNhapLai("");

        //Avoid spam click
        e.preventDefault();

        //Kiem tra cac dieu kien va gan ket qua vao bien
        const isTenDangNhapValid = !await kiemTraTenDangNhapDaTonTai(username);
        const isEmailValid = !await kiemTraEmailDaTonTai(email);
        const isPasswordValid = !kiemMatKhau(password);
        const isConfirmPasswordValid = !kiemMatKhauNhapLai(confirmPassword);

        if (isTenDangNhapValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            try {
                // Gọi hàm đăng ký và nhận kết quả
                const result = await register(username, email, password);

                // Thông báo thành công
                alert("Đăng ký thành công!");

                // Xóa các trường nhập liệu
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            } catch (error) {
                // Kiểm tra xem lỗi có phải từ API không và hiển thị thông báo phù hợp
                const errorMessage = error instanceof Error ? error.message : 'Đăng ký thất bại. Vui lòng thử lại.';
                alert(`Đăng ký thất bại: ${errorMessage}`);
            }
        }

    }
//Kiem Tra Ten Dang Nhap///////////////////////////////////////////////////////////////////////////////////////////
    const kiemTraTenDangNhapDaTonTai = async (username: string) =>{
        // endpoint
        const url = 'https://66e10816c831c8811b538fae.mockapi.io/api/login';
        console.log(url);

        try {
            const response = await fetch(url);
            const data = await response.json();  // Parse response as JSON

            // Check if any user in the data array has the same username
            const userExists = data.some((user: any) => user.username === username);

            if (userExists) {
                setErrorTenDangNhap("Username already exists!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Loi khi kiem tra ten dang nhap:", error);
            return false;
        }
    }

    const handleTenDangNhapChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        //Thay doi gia tri
        setUsername(e.target.value);
        setErrorTenDangNhap("");
        return kiemTraTenDangNhapDaTonTai(e.target.value);
    }


    //Kiem Tra Email//////////////////////////////////////////////////////////////////////////////////////////
    const kiemTraEmailDaTonTai = async (email: string) =>{
        // endpoint
        const url = 'https://66e10816c831c8811b538fae.mockapi.io/api/login';
        console.log(url);

        try {
            const response = await fetch(url);
            const data = await response.json();  // Parse response as JSON

            // Check if any user in the data array has the same username
            const emailExists = data.some((user: any) => user.email === email);

            if (emailExists) {
                setErrorEmail("Email already exists!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Loi khi kiem tra Email:", error);
            return false;
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        //Thay doi gia tri
        setEmail(e.target.value);
        setErrorEmail("");
        return kiemTraEmailDaTonTai(e.target.value);
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////

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

    //Kiem Tra Mat Khau Nhap Lai///////////////////////////////////////////////////////////////////////////////////////////
    const kiemMatKhauNhapLai = (confirmPassword: string) =>{
        if(confirmPassword !== password){
            setErrorMatKhauNhapLai("Passwords do not match!");
            return true;
        }
        setErrorMatKhauNhapLai("");// mat khau trung khop
        return  false;
    }

    const handleMatKhauNhapLaiChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        //Thay doi gia tri
        setConfirmPassword(e.target.value);
        setErrorMatKhauNhapLai("");
        return kiemMatKhauNhapLai(e.target.value);
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////

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
                className="card border-1 rounded-4  p-4 mt-5"
                style={{
                    maxWidth: "70vw", // Responsive max width relative to viewport width
                    width: "385px",
                    background: "rgba(193, 151, 88, 0.25)", // Semi-transparent orange background
                    backdropFilter: "blur(2px)", // Apply blur effect
                    borderColor: "#c69533",
                    display: 'flex',
                    boxShadow: '4px 10px 20px rgba(0, 0, 0, 0.25)',
                    flexDirection: 'column', // Thay đổi bố cục thành cột
                    justifyContent: 'center', // Căn giữa nội dung
                    alignItems: 'stretch' // Cho phép nội dung chiếm toàn bộ chiều rộng
                }}
            >
                <div className="card-body mx-2">
                    <h3 className="card-title card-title-cus"
                       >Sign up</h3>

                    {/* Username Input */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <div className="d-flex flex-column align-items-start">
                                <label htmlFor="tenDangNhap" className="form-label"
                                       >Username</label>
                                <input
                                    type="text"
                                    id="tenDangNhap"
                                    className="form-control custom-placeholder"
                                    value={username}
                                    placeholder="Enter your username"
                                    // onChange={handleTenDangNhapChange}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={handleTenDangNhapChange}

                                />
                                {errorTenDangNhap && ( // Kiểm tra có lỗi hay không
                                    <div className="error-register" >
                                        {errorTenDangNhap}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="d-flex flex-column align-items-start">
                                <label htmlFor="email" className="form-label"

                                >Email</label>
                                <input type="text"
                                       id="email"
                                       className="form-control custom-placeholder"
                                       value={email}
                                       placeholder="Enter your email"
                                    // onChange={handleEmailChange}
                                       onChange={(e) => setEmail(e.target.value)}
                                       onBlur={handleEmailChange}

                                />
                                {errorEmail && ( // Kiểm tra có lỗi hay không
                                    <div className="error-register" >
                                        {errorEmail}
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="mb-3">
                            <div className="d-flex flex-column align-items-start">
                                <label htmlFor="matKhau" className="form-label"
                                       >Password</label>
                                <input type="password"
                                       id="matKhau"
                                       className="form-control custom-placeholder"
                                       value={password}
                                       placeholder="Enter your password"
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
                        </div>

                        <div className="mb-3">
                            <div className="d-flex flex-column align-items-start">
                                <label htmlFor="matKhauNhapLai" className="form-label"
                                       >Confirm password</label>
                                <input type="password"
                                       id="matKhauNhapLai"
                                       className="form-control custom-placeholder"
                                       value={confirmPassword}
                                       placeholder="Confirm password"
                                       onChange={handleMatKhauNhapLaiChange}

                                />

                                {errorMatKhauNhapLai && ( // Kiểm tra có lỗi hay không
                                    <div className="error-register" >
                                        {errorMatKhauNhapLai}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="d-grid mb-2 mt-4">
                            <button type="submit" className="btn btn-primary fw-bold"
                                    style={{
                                        backgroundColor: '#c19758',
                                        borderColor: "#c69533",
                                        fontSize: '0.8rem',
                                        padding: '0.5rem'
                                    }}>Register
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}