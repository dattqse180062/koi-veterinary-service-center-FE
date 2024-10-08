import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';   // Import useNavigate
import axios from 'axios';

interface Feedback {
    feedback_id: number;
    rating: number;
    comment: string;
    date_time: string;
    appointment: Appointment;
}

interface Appointment {
    appointment_id: number;
    created_date: string;
    service_name: string;
    customer_name: string;
    email: string;
    phone_number: string;
}

const FeedbackDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Lấy feedback_id từ URL
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();  // Khởi tạo useNavigate

    useEffect(() => {
        const fetchFeedbackDetails = async () => {
            try {
                const response = await axios.get(`https://66fff3374da5bd2375529fe6.mockapi.io/api/v2/feedbackdetails/${id}`);
                setFeedback(response.data);
            } catch (error) {
                console.error('Error fetching feedback details:', error);
            }
        };
        fetchFeedbackDetails();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);  // Quay về trang trước
    };

    return feedback ? (
        <div style={{paddingTop: '80px' , textAlign: 'left', paddingLeft: '24px'}}>
            <h2>Feedback Detail (ID: {feedback.feedback_id})</h2>
            <p><strong>Rating:</strong> {feedback.rating}</p>
            <p><strong>Comment:</strong> {feedback.comment}</p>
            <p><strong>Date & Time:</strong> {new Date(feedback.date_time).toLocaleDateString('en-GB')}</p>

            <h3>Appointment Details</h3>
            {feedback.appointment ? (
                <>
                    <p><strong>Appointment ID:</strong> {feedback.appointment.appointment_id}</p>
                    <p><strong>Customer Name:</strong> {feedback.appointment.customer_name}</p>
                    <p><strong>Email:</strong> {feedback.appointment.email}</p>
                    <p><strong>Phone Number:</strong> {feedback.appointment.phone_number}</p>
                    <p><strong>Service Name:</strong> {feedback.appointment.service_name}</p>
                </>
            ) : (
                <p>No appointment details available.</p>
            )}
            {/* Thêm form chỉnh sửa hoặc nút lưu */}
            {/* Nút quay về */}
            <button className="btn btn-secondary mt-3" onClick={handleGoBack}>Back</button>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default FeedbackDetailPage;
