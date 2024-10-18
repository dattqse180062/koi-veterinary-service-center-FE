import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAppointmentDetails } from '../api/appointmentAPI';
import { fetchPayment, updatePayment } from '../api/paymentApi';

interface AppointmentDetailsProps {
    appointment_id: number;
    created_date: string;
    current_status: string;
    customer_name: string;
    email: string;
    phone_number: string;
    description: string;
    total_price: number;
    service: Service;
    moving_surcharge: movingSurcharge;
    address: Address
    veterinarian: Veterinarian;
    fish: Fish;
}

interface Service {
    service_id: number;
    service_name: string;
    service_price: number;
};

interface movingSurcharge {
    moving_surcharge_id: number;
    district: string;
    price: number;
};

interface Address {
    address_id: number;
    city: string;
    district: string;
    ward: string;
    home_number: string;
    status: boolean;
};

interface Veterinarian {
    user_id: number;
    first_name: string;
    last_name: string;
};

interface Fish {
    fish_id: number;
    gender: string;
    age: number;
    species: string;
    size: number;
    weight: number;
    color: string;
    origin: string;
    enable: boolean;
};

interface PaymentDetails {
    payment_id: number;
    payment_method: payment_method;
    payment_amount: number;
    description: string;
    status: payment_status;
}

enum payment_method {
    CASH = 'CASH',
    VN_PAY = 'VN_PAY',
}

enum payment_status {
    NOT_PAID = 'NOT_PAID',
    PAID = 'PAID',
}


const AppointmentDetails: React.FC = () => {
    const location = useLocation(); // Get the location object
    const appointment_id: number = location.state?.appointment_id; // Get the appointment_id from the location state
    const [appointment, setAppointment] = useState<AppointmentDetailsProps | null>(null); // Assuming your data structure
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null); // State for payment details
    // const [showDetails, setShowDetails] = useState(false); // State để quản lý hiển thị bảng view details
    const [isPaymentVisible, setIsPaymentVisible] = useState(false); // State to track if payment details are visible
    const [isEditingPaymentMethod, setIsEditingPaymentMethod] = useState(false); // State to handle editing payment method
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(''); // State to store selected payment method

    const navigate = useNavigate();
    const paymentRef = useRef<HTMLDivElement>(null); // Ref for payment details section

    // Fetch appointment details by ID
    useEffect(() => {
        const fetchDetails = async () => {
            if (appointment_id) {
                try {
                    const appointmentData = await getAppointmentDetails(Number(appointment_id)); // Fetch details by ID
                    setAppointment(appointmentData);
                } catch (error) {
                    console.error('Error fetching appointment details:', error);
                }
            }
        };

        fetchDetails();
    }, [appointment_id]);

    // Function to handle view payment details
    const handleViewPaymentDetails = async () => {
        if (!isPaymentVisible) {
            // Fetch payment details only when opening
            try {
                const paymentData = await fetchPayment(appointment_id);
                setPaymentDetails(paymentData);

                // Scroll to the payment details section after loading the details
                if (paymentRef.current) {
                    paymentRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                console.error('Error fetching payment details:', error);
            }
        }

        // Toggle the visibility of the payment details
        setIsPaymentVisible(!isPaymentVisible);
    };


    const handleEditPaymentMethod = () => {
        setIsEditingPaymentMethod(true); // Switch to editing mode
    };

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPaymentMethod(e.target.value); // Update selected payment method

    };

    const handleUpdatePaymentMethod = async () => {
        if (selectedPaymentMethod) {
            try {
                const updatedPayment = await updatePayment(appointment_id,
                    { // Update the payment method
                        // status: paymentDetails?.status
                        status: selectedPaymentMethod // Chỉ cập nhật trạng thái thanh toán
                    }
                );

                setPaymentDetails(updatedPayment); // Update the payment details
                setIsEditingPaymentMethod(false); // Exit editing mode
            } catch (error) {
                console.error('Error updating payment method:', error);
            }
        }
    };


    // console.log(paymentDetails);

    if (!appointment) {
        return <div>Loading...</div>;
    }

    // Function to format DateTime
    const formatDateTime = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleString('vi-VN', options);
    };

    const formattedDate = formatDateTime(appointment.created_date);

    return (
        <div className="container" style={{ marginTop: '2rem', textAlign: 'left' }}>
            <h2 className="mb-4" style={{ paddingTop: '65px' }}>Appointment Details</h2>

            <div className="card">
                <div className="card-body">                    
                    <div className="card-body">
                        <h5 className="card-title" style={{ width: '100%' }}>*Appointment ID: {appointment.appointment_id}</h5>

                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>Date:</strong> {formattedDate}</p>
                                <p><strong>Status:</strong> {appointment?.current_status}</p>

                                <h5 className="mt-3" style={{fontWeight: '900'}}>- Customer Information</h5>
                                <p><strong>Name:</strong> {appointment?.customer_name}</p>
                                <p><strong>Email:</strong> {appointment?.email}</p>
                                <p><strong>Phone:</strong> {appointment?.phone_number}</p>
                                <p><strong>Description:</strong> {appointment?.description}</p>


                                <h5 className="mt-3" style={{fontWeight: '900'}}>- Service Information</h5>
                                <p><strong>Service id:</strong> {appointment.service?.service_id}</p>
                                <p><strong>Service name:</strong> {appointment.service?.service_name}</p>
                                <p><strong>Service Price:</strong> {appointment.service?.service_price} USD</p>

                                <h5 className="mt-3" style={{fontWeight: '900'}}>- Veterinarian Information</h5>
                                <p><strong>Name:</strong> {appointment.veterinarian?.first_name} {appointment.veterinarian?.last_name}</p>

                                <h5 className="mt-3" style={{fontWeight: '900'}}>- Address Information: </h5>
                                {appointment.address?.home_number || 'Not available'}, {appointment.address?.ward || 'Not available'}, {appointment.address?.district || 'Not available'}, {appointment.address?.city || 'Not available'}
                            </div>

                            <div className="col-md-6">
                                <h5 className="mt-3" style={{fontWeight: '900'}}>- Fish Information</h5>
                                <p><strong>Species:</strong> {appointment.fish?.species}</p>
                                <p><strong>Gender:</strong> {appointment.fish?.gender}</p>
                                <p><strong>Size:</strong> {appointment.fish?.size} cm</p>
                                <p><strong>Weight:</strong> {appointment.fish?.weight} kg</p>
                                <p><strong>Origin:</strong> {appointment.fish?.origin}</p>

                                <h5 className="mt-3" style={{fontWeight: '900'}}>- Moving Surcharge</h5>
                                <p><strong>District:</strong> {appointment.moving_surcharge?.district || 'Not available'}</p>
                                <p><strong>Price:</strong> {appointment.moving_surcharge?.price || '0'} USD </p>

                                <h5 className="mt-3" style={{fontWeight: '900'}}>- Total Price</h5>
                                <p><strong>Total:</strong> {appointment?.total_price || ''} USD</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{ marginTop: '2rem', marginBottom: '2rem' }}
            >
                {/* Back Button */}
                <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back</button>

                {/* View Payment Details Button */}
                <button className="btn btn-primary mt-3"
                    style={{ marginLeft: '10px' }}
                    onClick={handleViewPaymentDetails}>
                    View Payment Details
                </button>

            </div>


            {/* Conditionally render payment details */}
            {isPaymentVisible && paymentDetails && (
                <div className="card mt-4"
                    style={{ marginBottom: '2rem' }}
                >
                    <div className="card-body">
                        <h5 className="card-title">Payment Details</h5>
                        <p><strong>Payment ID:</strong> {paymentDetails.payment_id}</p>
                        <p><strong>Payment method: </strong>{paymentDetails.payment_method}</p>
                        <p><strong>Payment amount:</strong> {paymentDetails.payment_amount} USD</p>
                        <p><strong>Status:</strong> {paymentDetails.status || 'Unknown'}</p>
                        <p><strong>Description: <input type="text" /> </strong></p>
                        {/* Edit payment method */}
                        {isEditingPaymentMethod ? (
                            <select
                                className="form-select"
                                value={selectedPaymentMethod}
                                onChange={handlePaymentMethodChange}
                                style={{ marginLeft: '10px', width: '150px' }}
                            >
                                <option value="PAID">PAID</option>
                                <option value="NOT_PAID">NOT PAID</option>  {/* khong can, loi logic */}
                                
                            </select>
                        )
                            : null
                        }

                        {/* Button to toggle edit/save */}
                        {isEditingPaymentMethod ? (
                            <button
                                style={{ marginTop: '5px' }}
                                className="btn btn-success ms-3" onClick={handleUpdatePaymentMethod}>
                                Save
                            </button>
                        ) : (
                            <button className="btn btn-secondary ms-3" onClick={handleEditPaymentMethod}>
                                Update Payment Status
                            </button>
                        )}

                    </div>
                </div>
            )}


        </div>

    );
};

export default AppointmentDetails;
