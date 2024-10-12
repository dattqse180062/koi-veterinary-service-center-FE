import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/Profile.css'
const FillInformationPage: React.FC = () => {

    const service = useSelector((state: any) => state.service);
    const service_id = service.service_id;
    console.log(service_id)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        description: '',
        paymentMethod:'online', // Default to online payment if service_id is 1
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit form data logic here
        console.log(formData);
    };

    return (
        <div className="container profile-page d-flex flex-grow-1 align-items-center">
            <div className="form-section ">
                <form onSubmit={handleSubmit} className="profile-form ">
                    <div className="form-group ">
                        <label className="fw-bold form-label">Your Name</label>
                        <input
                            type="text"
                            className="form-control input-field"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group ">
                        <label className="fw-bold form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control input-field"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="fw-bold form-label">Email</label>
                        <input
                            type="email"
                            className="form-control input-field"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Only show the address input if service_id is not 1 or 3 */}
                    {(service_id !== 1 && service_id !== 3) && (
                        <div className="form-group ">
                            <label className="fw-bold form-label">Address</label>
                            <input
                                type="text"
                                className="form-control input-field"
                                name="address"
                                placeholder="Enter address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="form-group ">
                        <label className="fw-bold form-label">Description</label>
                        <textarea
                            className="form-control input-field"
                            name="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className=" form-group">
                        <label className="fw-bold form-label">Payment Method</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="paymentMethod"
                                value="online"
                                checked={formData.paymentMethod === 'online'}
                                onChange={handleChange}
                                disabled={service_id === 1 ? false : false} // Only enable online payment if service_id is 1
                            />
                            <label className="form-check-label">Pay Online</label>
                        </div>

                        {/* Show cash payment option only if service_id is not 1 */}
                        {service_id !== 1 && (
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash"
                                    checked={formData.paymentMethod === 'cash'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">Pay with Cash</label>
                            </div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>
                </form>
            </div>
        </div>
            );
            };

            export default FillInformationPage;
