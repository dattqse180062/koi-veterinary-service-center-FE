import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TableComponent from '../../table/TableComponent';
import Sidebar from '../../layout/Sidebar';

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
  const columns = ['appointmentID', 'created', 'customer', 'totalPrice', 'description', 'status']; // Các cột trong bảng
  const columnHeaders = ['Appointment ID', 'Created Date', 'Customer Name', 'Total Price', 'Description', 'Status']; // Tiêu đề cột
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
        const formattedData = response.data.map((order: Order) => ({
          ...order,
          created: new Date(order.created).toLocaleString('vi-VN'), // Format the date here
        }));
        setOrderData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error); // Gọi hàm fetch khi component mount
      }
    };
    fetchAppointmentData();
  }, []);

  const handleViewDetail = (appointmentID: number) => {
    // setSelectedOrder(order);
    // setShowDetailModal(true); // Mở modal thông qua state
    navigate(`/appointment-details`, { state: { appointmentID } }); // Điều hướng tới trang chi tiết
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

  const actions = [
    {
        label: 'View details',
        icon: 'fas fa-calendar-alt',
        onClick: handleViewDetail, // This is now compatible
    },
    {
        label: 'Delete',
        icon: 'fas fa-info-circle',
        onClick: handleDelete,
    },
];

  return (
    <div className="d-flex flex-grow-1">
      <Sidebar />
      <div className='container' style={{ marginTop: "6rem" }}>
        <div className='card' style={{ width: '100%' }}>
          {/* Header of content */}
          <div className='card-header'>
            <h5 className='text-start' style={{ fontWeight: "bold", color: "#02033B", fontSize: "2rem", padding: "1.2rem" }}>Customer Management</h5>
          </div>
          <div className='card-body'>
            <TableComponent
              columns={columns}
              columnHeaders={columnHeaders}
              data={orderData}
              actions={actions} // Pass actions prop
              isKoiFishPage={false}
            />
          </div>
        </div>
      </div>

      

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
