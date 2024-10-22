// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createStaff } from '../api/staffApi';
// import '../../src/styles/AddStaffPage.css';
// const AddStaffPage: React.FC = () => {
//     const navigate = useNavigate();
//     const [staffData, setStaffData] = useState({
//         firstName: '',
//         lastName: '',
//         username: '',
//         phoneNumber: '',
//         password: ''
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setStaffData({
//             ...staffData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSave = async () => {
//         try {
//             await createStaff(staffData);
//             navigate('/staff'); // Go back to the staff list page after saving
//         } catch (error) {
//             console.error('Failed to save staff', error);
//         }
//     };

//     const handleCancel = () => {
//         navigate('/staff'); // Go back to the staff list page without saving
//     };

//     return (
//         <div className="container" style={{ marginTop: "6rem" }}>
//             <div className="card" style={{ width: '100%' }}>
//                 <div className="card-header">
//                     <h5 className="text-start" style={{ fontWeight: "bold", color: "#02033B", fontSize: "2rem", padding: "1.2rem" }}>
//                         Add New Staff
//                     </h5>
//                 </div>
//                 <div className="card-body"
                
//                 >
//                     <form>
//                         <div className="mb-3">
//                             <label htmlFor="firstName" className="form-label" style={{color:'black'}}>First Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="firstName"
//                                 name="firstName"
//                                 value={staffData.firstName}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="lastName" className="form-label">Last Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="lastName"
//                                 name="lastName"
//                                 value={staffData.lastName}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="username" style={{textAlign:'left'}} className="form-label">Username</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="username"
//                                 name="username"
//                                 value={staffData.username}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="phoneNumber"
//                                 name="phoneNumber"
//                                 value={staffData.phoneNumber}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="password" className="form-label">Password</label>
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 id="password"
//                                 name="password"
//                                 value={staffData.password}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="d-flex justify-content-between">
//                             <button type="button" className="btn btn-primary" onClick={handleSave}>
//                                 Save
//                             </button>
//                             <button type="button" className="btn btn-secondary" onClick={handleCancel}>
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddStaffPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStaff } from '../api/staffApi';

const AddStaffPage: React.FC = () => {
    const navigate = useNavigate();
    const [staffData, setStaffData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        phoneNumber: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStaffData({
            ...staffData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            await createStaff(staffData);
            navigate('/staff'); // Go back to the staff list page after saving
        } catch (error) {
            console.error('Failed to save staff', error);
        }
    };

    const handleCancel = () => {
        navigate('/manager/staff-list'); // Go back to the staff list page without saving
    };

    return (
        <div className="container" style={{ marginTop: "6rem" }}>
            <div className="card" style={{ width: '100%' }}>
                <div className="card-header">
                    <h5 className="text-start" style={{ fontWeight: "bold", color: "#02033B", fontSize: "2rem", padding: "1.2rem" }}>
                        Add New Staff
                    </h5>
                </div>
                <div className="card-body">
                    <form className="add-staff-form">
                        <div className="mb-3 row">
                            <label htmlFor="firstName" className="col-sm-3 col-form-label text-end">First Name</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    value={staffData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter First Name"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="lastName" className="col-sm-3 col-form-label text-end">Last Name</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={staffData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter Last Name"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="username" className="col-sm-3 col-form-label text-end">Username</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={staffData.username}
                                    onChange={handleChange}
                                    placeholder="Enter Username"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="phoneNumber" className="col-sm-3 col-form-label text-end">Phone Number</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={staffData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Phone Number"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="password" className="col-sm-3 col-form-label text-end">Password</label>
                            <div className="col-sm-9">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={staffData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                />
                            </div>
                        </div>
                        <div className="d-flex-end justify-content mt-4">
                            <button type="button" style={{marginLeft:'16px'}} className="btn btn-primary" onClick={handleSave}>
                                Save
                            </button>
                            <button type="button" style={{marginLeft:'16px'}} className="btn btn-secondary" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStaffPage;
