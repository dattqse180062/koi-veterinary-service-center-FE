import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Order {
  appointmentID: number;
  created: string;
  veterinarianName: string;
  totalPrice: number;
  description: string;
  status: 'Done' | 'In process' | 'Cancel';
}

const AppointmentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`https://66ffea2b4da5bd237552738e.mockapi.io/api/v1/appointment/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order detail:', error);
      }
    };

    fetchOrderDetail();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);  // Quay về trang trước
};

  return (
    <div style={{paddingTop: '80px' , textAlign: 'left', paddingLeft: '24px', justifyContent: 'center'}}>
      <h2>Appointment Detail</h2>
      {order ? (
        <>
          <p><strong>Appointment ID:</strong> {order.appointmentID}</p>
          <p><strong>Created Date:</strong> {new Date(order.created).toLocaleString('en-GB')}</p>
          <p><strong>Veterinarian Name:</strong> {order.veterinarianName}</p>
          <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
          <p><strong>Description:</strong> {order.description}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <button className="btn btn-secondary" onClick={handleGoBack}>Back</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AppointmentDetailsPage;
