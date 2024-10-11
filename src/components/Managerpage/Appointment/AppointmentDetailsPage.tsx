import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, replace } from 'react-router-dom';
import axios from 'axios';

interface Order {
  appointmentID: string;
  created: string;
  customer: string;
  totalPrice: number;
  description: string;
  status: 'Done' | 'In process' | 'Cancel';
}

const AppointmentHistoryDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentID: string = location.state?.appointmentID; // Lấy appointmentID từ state

  const [order, setOrder] = useState<Order | null>(null); // State để lưu thông tin chi tiết đơn hàng

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!appointmentID) {
          console.error('Appointment ID is missing.');
          return;
        }
        // Gọi API để lấy chi tiết cuộc hẹn
        const response = await axios.get(`https://66f4e0b477b5e889709aba92.mockapi.io/api/Appointment/${appointmentID}`);
        setOrder(response.data); // Lưu thông tin vào state
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [appointmentID]); // Chỉ chạy lại khi appointmentID thay đổi

  const handleGoBack = () => {
    navigate(-1); // Điều hướng quay lại trang trước
    
  };

  return (
    <div style={{ paddingTop: '80px', textAlign: 'left', paddingLeft: '24px' }}>
      <h2>Appointment Details</h2>
      {order ? (
        <>
          <p><strong>Appointment ID:</strong> {order.appointmentID}</p>
          <p><strong>Created Date:</strong> {new Date(order.created).toLocaleDateString()}</p>
          <p><strong>Customer Name:</strong> {order.customer}</p>
          <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
          <p><strong>Description:</strong> {order.description}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <button className='btn btn-secondary mt-3' onClick={handleGoBack}>Back</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AppointmentHistoryDetailsPage;
