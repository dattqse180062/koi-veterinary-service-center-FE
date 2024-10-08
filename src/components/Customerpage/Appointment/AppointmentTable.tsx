import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../styles/AppointmentCustomerTable.css';

interface Order {
  appointmentID: number;
  created: string;
  veterinarianName: string;
  totalPrice: number;
  description: string;
  status: 'Done' | 'In process' | 'Cancel';
}

const AppointmentCustomerHistoryTable: React.FC = () => {

  const [orderData, setOrderData] = useState<Order[]>([]); // fixed, replace initialOrderData
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  // Fetch appointment data from the API when the component mounts
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get('https://66ffea2b4da5bd237552738e.mockapi.io/api/v1/appointment');
        setOrderData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAppointmentData();
  }, []);

  const handleViewDetail = (appointmentID: number) => {
    navigate(`/appointment/${appointmentID}`); // Điều hướng tới trang chi tiết
  };

  const handleOpenDeleteModal = (order: Order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (selectedOrder) {
      setOrderData((prevData) => prevData.filter((order) => order.appointmentID !== selectedOrder.appointmentID));
      setShowDeleteModal(false);
    }
  };

  // Calculate the indices for slicing the order data
  const indexOfLastOrder = currentPage * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orderData.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: '25px' }}>
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
            <th>Veterinarian Name</th>
            <th>Total Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.appointmentID}>
              <td className="fw-bold">{order.appointmentID}</td>
              <td>
                {/* {order.created} */}
                {/* {new Date(order.created).toLocaleDateString('en-GB')} */}
                {new Date(order.created).toLocaleString('en-GB')}
              </td>
              <td>{order.veterinarianName}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.description}</td>
              <td>
                <div className="dropdown">
                  <button className="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdown-basic" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdown-basic">
                    {/* <li><a className="dropdown-item" href="#" onClick={() => handleViewDetail(order)}>View Detail</a></li> */}
                    <li>
                      <a className="dropdown-item" href="#" onClick={() => handleViewDetail(order.appointmentID)}>
                        View Detail
                      </a>
                    </li>
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
                    <p><strong>Created Date:</strong> {new Date(selectedOrder.created).toLocaleString('en-gb')}</p>
                    <p><strong>Veterinarian Name:</strong> {selectedOrder.veterinarianName}</p>
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

export default AppointmentCustomerHistoryTable;
