import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAppointmentDetailsForCus } from '../api/appointmentAPI';
import { createPayment, fetchPayment } from '../api/paymentApi';
import { createFeedback, getFeedbackDetailsCus } from '../api/feedbackApi';
import { Rating, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface AppointmentDetailsProps {
    appointment_id: number;
    created_date: string;
    current_status: string;
    customer_name: string;
    slot: Slot;
    email: string;
    phone_number: string;
    description: string;
    total_price: number;
    service: Service;
    moving_surcharge: movingSurcharge;
    address: Address;
    veterinarian: Veterinarian;
    fish: Fish;
    payment: PaymentDetails;
    feedback_id: number
}

interface Service {
    service_id: number;
    service_name: string;
    service_price: number;
}

interface movingSurcharge {
    moving_surcharge_id: number;
    district: string;
    price: number;
}

interface Address {
    address_id: number;
    city: string;
    district: string;
    ward: string;
    home_number: string;
    status: boolean;
}

interface Veterinarian {
    user_id: number;
    first_name: string;
    last_name: string;
}

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
}

interface PaymentDetails {
    payment_id: number;
    payment_method: payment_method;
    payment_amount: number;
    description: string;
    status: payment_status;
}

interface Slot {
    slot_id: number,
    year: number,
    month: number,
    day: number,
    slot_order: number,
    description: string,
}

enum payment_method {
    CASH = 'CASH',
    VN_PAY = 'VN_PAY',
}

enum payment_status {
    NOT_PAID = 'NOT_PAID',
    PAID = 'PAID',
}

const CustomerAppointmentDetails: React.FC = () => {
    const location = useLocation();
    const appointment_id: number = location.state?.appointment_id;
    const [appointment, setAppointment] = useState<AppointmentDetailsProps | null>(null);
    const [PaymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    // const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const paymentRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState('');
    const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false); // New state

    // Fetch appointment details by ID
    useEffect(() => {
        const fetchDetails = async () => {
            if (appointment_id) {
                try {
                    const appointmentData = await getAppointmentDetailsForCus(Number(appointment_id));
                    const paymentData = await fetchPayment(appointment_id);
                    setAppointment(appointmentData);
                    setPaymentDetails(paymentData); // Update only PaymentDetails state
                } catch (error) {
                    console.error('Error fetching appointment details:', error);
                }
            }
        };

        fetchDetails();
    }, [appointment_id]);

    if (!appointment) {
        return <div>Loading...</div>;
    }

    const formatDateTime = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleString('en-GB', options);
    };

    const formattedDate = formatDateTime(appointment.created_date);

    const handlePayment = async () => {
        try {
            const paymentUrl = await createPayment(appointment_id);
            window.open(paymentUrl, '_blank'); // Open payment URL in a new tab
        } catch (error) {
            if (payment_method.CASH === PaymentDetails?.payment_method) {
                alert('You can not paid, only VN Pay can do this.');
            } else {
                alert('You have paid already.');
            }
            console.error('Error initiating payment:', error);
        }
    };

    //Use to handle submit feedback
    const handleFeedbackSubmit = async () => {
        if (rating && comment) {
            const feedbackDto = {
                rating,
                comment,
            };

            try {
                // Call the createFeedback API function
                await createFeedback(appointment_id, feedbackDto);

                setShowFeedbackModal(false);  // Close the modal after successful submission

                // Optionally, reset the feedback form
                setRating(null);
                setComment('');
            } catch (error) {
                console.error('Error submitting feedback:', error);
                // Optionally show an error message to the user
                alert('Failed to submit feedback.');
            }
        } else {
            alert('Please provide both a rating and a comment.');
        }
    };


    const handleCloseFeedback = () => {
        setShowFeedbackModal(false);
        setRating(null); // Reset rating and comment when canceled
        setComment('');
    };

    return (
        <div className="container" style={{ marginTop: '2rem', textAlign: 'left' }}>
            <h2 className="mb-4" style={{ paddingTop: '65px' }}>Appointment Details</h2>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title" style={{ width: '100%' }}>
                        *Appointment ID: {appointment.appointment_id}
                    </h5>

                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Date: </strong>
                                {appointment.slot?.day}/{appointment.slot?.month}/{appointment.slot?.year}
                            </p>
                            <p><strong>Description:</strong> {appointment.slot?.description}</p>
                            {/* <p><strong>Status: </strong> 
                            {appointment?.current_status}                            
                            </p> */}

                            <p><strong>Status: </strong>
                                <span style={{
                                    fontWeight: '900',
                                    color: 'white',
                                    padding: '4px 8px',
                                    backgroundColor: appointment?.current_status === 'DONE' ? 'green' :
                                        appointment?.current_status === 'PENDING' ? 'orange' :
                                            appointment?.current_status === 'ON_GOING' ? 'blue' :
                                                appointment?.current_status === 'CANCELLED' ? 'red' :
                                                    'black' // Default color for other statuses
                                }}>
                                    {appointment?.current_status}
                                </span>
                            </p>


                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Customer Information</h5>
                            <p><strong>Name:</strong> {appointment?.customer_name}</p>
                            <p><strong>Email:</strong> {appointment?.email}</p>
                            <p><strong>Phone:</strong> {appointment?.phone_number}</p>
                            <p><strong>Description:</strong> {appointment?.description}</p>
                            <p><strong>Feedback id:</strong> {appointment?.feedback_id}</p>


                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Service Information</h5>
                            <p><strong>Service name:</strong> {appointment.service?.service_name}</p>
                            <p><strong>Service Price:</strong> {appointment.service?.service_price} VND</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Veterinarian Information</h5>
                            <p><strong>Name:</strong> {appointment.veterinarian?.first_name} {appointment.veterinarian?.last_name}</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Address Information</h5>
                            {appointment.address?.home_number}, {appointment.address?.ward}, {appointment.address?.district}, {appointment.address?.city}
                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Fish Information</h5>
                            <p><strong>Species:</strong> {appointment.fish?.species || 'NA'}</p>
                            <p><strong>Gender:</strong> {appointment.fish?.gender || 'NA'}</p>
                            <p><strong>Size:</strong> {appointment.fish?.size || 'NA'} cm </p>
                            <p><strong>Weight:</strong> {appointment.fish?.weight || 'NA'} kg</p>
                            <p><strong>Origin:</strong> {appointment.fish?.origin || 'NA'}</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Moving Surcharge</h5>
                            <p><strong>District:</strong> {appointment.moving_surcharge?.district || 'Not available'}</p>
                            <p><strong>Price:</strong> {appointment.moving_surcharge?.price || '0'} VND</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Total Price</h5>
                            <p><strong>Total:</strong> {appointment?.total_price || ''} VND</p>

                            <div ref={paymentRef} className="mt-3">
                                <h5 className="mt-3" style={{ fontWeight: '900' }}>- Payment Information</h5>
                                <p><strong>Payment Method:</strong> {PaymentDetails?.payment_method || 'N/A'}</p>
                                <p><strong>Payment Amount:</strong> {PaymentDetails?.payment_amount || 'N/A'} VND</p>
                                <p><strong>Description:</strong> {PaymentDetails?.description || 'N/A'}</p>
                                {/* <p><strong>Status: </strong> 
                                {PaymentDetails?.status || 'N/A'}
                                </p> */}
                                <p><strong>Status: </strong>
                                    <span style={{
                                        backgroundColor: PaymentDetails?.status === 'PAID' ? 'green' :
                                            PaymentDetails?.status === 'NOT_PAID' ? 'red' : 'transparent',
                                        color: 'white',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        display: 'inline-block',
                                        fontWeight: 'bold'
                                    }}>
                                        {PaymentDetails?.status || 'N/A'}
                                    </span>
                                </p>

                                {/* Show Payment button only if payment method is VN PAY and curreny status is NOT_PAID */}
                                {PaymentDetails?.payment_method === payment_method.VN_PAY && PaymentDetails?.status === payment_status.NOT_PAID && (
                                    <button className="btn btn-primary mt-3" onClick={handlePayment}>Pay</button>
                                )}
                            </div>



                            {/* Show Make Feedback button only if current_status is 'done' and don't have feedback id */}
                            {appointment.current_status === 'DONE' && PaymentDetails?.status === 'PAID' && !appointment.feedback_id && (
                                <div className="mt-3">
                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            // setShowFeedbackForm(!showFeedbackForm)
                                            setShowFeedbackModal(true)
                                        }
                                    >
                                        Make Feedback
                                    </button>
                                </div>
                            )}

                            {/* Feedback Modal */}
                            <Dialog open={showFeedbackModal} onClose={handleCloseFeedback}>
                                <DialogTitle>Submit Feedback</DialogTitle>
                                <DialogContent>
                                    <label>Rating: </label>
                                    <Rating
                                        name="feedback-rating"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                    />
                                    <TextField
                                        label="Comment"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        style={{ marginTop: '20px' }}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseFeedback} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleFeedbackSubmit} color="primary" variant="contained">
                                        Send
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back</button>
            </div>

        </div>
    );
};

export default CustomerAppointmentDetails;
