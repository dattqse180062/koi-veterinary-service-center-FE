import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Định nghĩa interface cho Order
interface Order {
  appointmentID: string; // ID của cuộc hẹn
  created: string; // Ngày tạo cuộc hẹn
  customer: string; // Tên khách hàng
  totalPrice: number; // Tổng giá
  description: string; // Mô tả cuộc hẹn
  status: 'Done' | 'In process' | 'Cancel'; // Trạng thái cuộc hẹn
}

// Component chính cho bảng lịch sử cuộc hẹn
const AppointmentHistoryTable: React.FC = () => {
  // State để lưu trữ dữ liệu đơn hàng
  const [orderData, setOrderData] = useState<Order[]>([]); // fixed, replace initialOrderData // Dữ liệu đơn hàng
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // Đơn hàng đã chọn
  const [currentPage, setCurrentPage] = useState<number>(1); // Trang hiện tại
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // Trạng thái modal xóa
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false); // Trạng thái modal chi tiết
  const rowsPerPage = 5; // Số hàng mỗi trang
  const navigate = useNavigate();  // Hàm điều hướng

  // Fetch appointment data from the API when the component mounts
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get('https://66f4e0b477b5e889709aba92.mockapi.io/api/Appointment');
        setOrderData(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Error fetching data:', error); // Gọi hàm fetch khi component mount
      }
    };
    fetchAppointmentData();
  }, []);

  const handleViewDetail = (appointmentID: string) => {
    // setSelectedOrder(order);
    // setShowDetailModal(true); // Mở modal thông qua state
    navigate(`/appointment-details`, {state: {appointmentID}}); // Điều hướng tới trang chi tiết
  };

  const handleOpenDeleteModal = (order: Order) => {
    setSelectedOrder(order); // Lưu đơn hàng đã chọn
    setShowDeleteModal(true); // Hiển thị modal xóa
  };

  const handleDelete = () => {
    if (selectedOrder) {  // Cập nhật dữ liệu đơn hàng sau khi xóa
      setOrderData((prevData) => prevData.filter((order) => order.appointmentID !== selectedOrder.appointmentID));
      setShowDeleteModal(false); // Đóng modal xóa
    }
  };

  // Calculate the indices for slicing the order data
  const indexOfLastOrder = currentPage * rowsPerPage; // Chỉ số đơn hàng cuối
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage; // Chỉ số đơn hàng đầu
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder); // Dữ liệu đơn hàng hiện tại
  const totalPages = Math.ceil(orderData.length / rowsPerPage); // Tổng số trang

  // Xử lý sự kiện thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
  };

  return (
    <div style={{width: '80%'}}>
      <h5 style={{ paddingTop: '65px' }}>Appointment History Management</h5>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex">
          <div className="input-group me-3" style={{ width: '300px' }}>
            <input type="text" className="form-control" placeholder="Type here..." aria-label="Search" />
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>

      <table className="table table-hover bg-white">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Created Date</th>
            <th>Customer Name</th>
            <th>Total Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.appointmentID}>
              <td className="fw-bold">{order.appointmentID}</td>
              <td>{new Date(order.created).toLocaleString('en-gb')}</td>
              <td>{order.customer}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.description}</td>
              <td>
                <div className="dropdown">
                  <button className="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdown-basic" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdown-basic">
                    <li><a className="dropdown-item" href="#" onClick={() => handleViewDetail(order.appointmentID)}>View Detail</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleOpenDeleteModal(order)}>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>

      {/* Modal for View Details */}
      {selectedOrder && (
        <div
          className={`modal fade ${showDetailModal ? 'show' : ''}`}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="viewDetailsModalLabel"
          aria-hidden={!showDetailModal}
          style={{ display: showDetailModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewDetailsModalLabel">Customer Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDetailModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {selectedOrder && (
                  <>
                    <p><strong>Appointment ID:</strong> {selectedOrder.appointmentID}</p>
                    <p><strong>Created Date:</strong>{new Date(selectedOrder.created).toLocaleDateString()}</p>
                    <p><strong>Customer Name:</strong> {selectedOrder.customer}</p>
                    <p><strong>Total Price:</strong> ${selectedOrder.totalPrice.toFixed(2)}</p>
                    <p><strong>Description:</strong> {selectedOrder.description}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Confirm Deletion */}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete appointment ID: {selectedOrder?.appointmentID}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AppointmentHistoryTable;
