import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Customer {
  avatar: string;
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

// Danh sách khách hàng ban đầu
const initialCustomers: Customer[] = [
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '1234567890' },
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phoneNumber: '9876543210' },
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 3, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '1234567890' },
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 4, firstName: 'Emily', lastName: 'Johnson', email: 'emily@example.com', phoneNumber: '2345678901' },
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 5, firstName: 'Michael', lastName: 'Brown', email: 'michael@example.com', phoneNumber: '3456789012' },
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 6, firstName: 'Sarah', lastName: 'Davis', email: 'sarah@example.com', phoneNumber: '4567890123' },
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 7, firstName: 'David', lastName: 'Wilson', email: 'david@example.com', phoneNumber: '5678901234' },
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 8, firstName: 'Emma', lastName: 'Taylor', email: 'emma@example.com', phoneNumber: '6789012345' },
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 9, firstName: 'Daniel', lastName: 'Anderson', email: 'daniel@example.com', phoneNumber: '7890123456' },
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 10, firstName: 'Olivia', lastName: 'Thomas', email: 'olivia@example.com', phoneNumber: '8901234567' },
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 11, firstName: 'James', lastName: 'Jackson', email: 'james@example.com', phoneNumber: '9012345678' },
    { avatar: 'passed-stamp_1017-8239.jpg', customerId: 12, firstName: 'Sophia', lastName: 'White', email: 'sophia@example.com', phoneNumber: '0123456789' }
    // Add more customers if necessary
  ];

const CustomerDetailPage: React.FC = () => {
  // Lấy customerId từ URL
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();

  // Tìm khách hàng dựa trên customerId
  const customer = initialCustomers.find((c) => c.customerId === Number(customerId));

  // Nếu không tìm thấy khách hàng, hiển thị thông báo lỗi
  if (!customer) {
    return (
      <div style={{ padding: '20px' }}>
        <h3>Customer not found</h3>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Customer Details</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={customer.avatar}
          alt={customer.firstName}
          style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }}
        />
        <div>
          <p><strong>Full Name:</strong> {`${customer.firstName} ${customer.lastName}`}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone Number:</strong> {customer.phoneNumber}</p>
        </div>
      </div>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default CustomerDetailPage;