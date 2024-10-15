import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AppointmentOrderPage: React.FC = () => {
    const navigate = useNavigate();

    // Fetching data from Redux store
    const service = useSelector((state: any) => state.service);
    const doctor = useSelector((state: any) => state.doctor);
    const slot = useSelector((state: any) => state.slot);
    const formData = useSelector((state: any) => state.formData);
    const [surcharges, setSurcharges] = useState<any[]>([]);
    const [surchargePrice, setSurchargePrice] = useState<number | null>(null);

    const slotTimeMapping: { [key: number]: string } = {
        1: '7:30 - 9:30',
        2: '10:00 - 12:00',
        3: '13:00 - 15:00',
        4: '15:30 - 17:30',
    };

    const fetchSurcharges = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/surcharges');
            setSurcharges(response.data);
        } catch (error) {
            console.error('Error fetching surcharges:', error);
        }
    };

    const findSurchargePrice = () => {
        const matchingSurcharge = surcharges.find(surcharge => surcharge.district === formData.district);
        if (matchingSurcharge) {
            setSurchargePrice(matchingSurcharge.price);
        } else {
            setSurchargePrice(0); // Set to 0 or handle as needed if no match is found
        }
    };

    // Fetch surcharges when the component mounts
    useEffect(() => {
        fetchSurcharges();
    }, []);

    // Update surcharge price when surcharges or formData changes
    useEffect(() => {
        if (surcharges.length > 0 && formData.district) {
            findSurchargePrice();
        }
    }, [surcharges, formData.district]);

    // Function to handle order confirmation
    const handleConfirmOrder = () => {
        // Implement order confirmation logic here
        alert('Order confirmed!');
        // Navigate to a confirmation page or home page
        navigate('/');
    };

    const servicePrice = service?.service_price || 0;
    const totalPrice = (surchargePrice !== null ? surchargePrice : 0) + servicePrice;
    const handleBackClick = () => {
        navigate('/appointment/fill-information'); // Navigate back to service selection page
    };
    return (
        <div className="d-flex justify-content-center align-items-center"
             style={{minHeight: '100vh'}}>
            <div className="container">
                <button
                    className="btn btn-secondary mb-3"
                    style={{position: 'absolute', top: '12%', left: '3%'}}
                    onClick={handleBackClick}>
                    Back
                </button>
                <h1 className="display-4 fw-bold text-center" style={{color: '#02033B'}}>Confirm Your Appointment</h1>
                <div className="row mt-4">
                    {/* Doctor Card */}
                    <div className="col-md-3 mb-3 d-flex justify-content-center align-items-center">
                        <div className="card shadow " style={{borderRadius: '40px', width: '300px', height: '330px'}}>
                            <img
                                src={doctor?.avatar}
                                className="card-img-top rounded-circle mx-auto mt-4"
                                alt={`${doctor?.first_name} ${doctor?.last_name}`}
                                style={{width: '200px', height: '200px'}}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title text-center"
                                    style={{marginLeft: "25px"}}>{`${doctor?.first_name} ${doctor?.last_name}`}</h5>
                            </div>
                        </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="col-md-9 mb-3">
                        <div className="card shadow" style={{borderRadius: '20px', padding: '20px'}}>
                            <h5 className="card-title " style={{width: "320px", fontSize: "2rem"}}>Appointment
                                Details</h5>
                            <div className="appointment-details text-start mb-3"
                                 style={{fontSize: "1.2rem", marginLeft: "1.5rem"}}>
                                <div>
                                    <strong>Service Name:</strong> {service?.service_name}
                                </div>
                                <div>
                                    <strong>Date:</strong> {slot?.day}/{slot?.month}/{slot?.year} (Slot {slot?.slot_order} / {slotTimeMapping[slot?.slot_order]})
                                </div>
                                <div>
                                    <strong>Customer Name:</strong> {formData?.customer_name}
                                </div>
                                <div>
                                    <strong>Phone:</strong> {formData?.phone}
                                </div>
                                <div>
                                    <strong>Address:</strong> {formData?.address ? formData.address : 'N/A'}
                                </div>
                                <div>
                                    <strong>Fish:</strong> {formData?.fish ? formData.fish : 'N/A'}
                                </div>
                                <div>
                                    <strong>Email:</strong> {formData?.email}
                                </div>
                                <div>
                                    <strong>Service Price:</strong> ${service?.service_price.toFixed(2)}
                                </div>
                                <div>
                                    <strong>Surcharge
                                        Price:</strong> ${surchargePrice !== null ? surchargePrice.toFixed(2) : '0'}
                                </div>
                                <div>
                                    <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={handleConfirmOrder}>
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOrderPage;
