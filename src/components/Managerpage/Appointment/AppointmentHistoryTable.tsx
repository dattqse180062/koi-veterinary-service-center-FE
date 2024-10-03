import React, { useState } from 'react';

interface Order {
  appointmentID: number;
  created: string;
  customer: string;
  totalPrice: number;
  description: string;
  status: 'Done' | 'In process' | 'Cancel';
}

const AppointmentHistoryTable: React.FC = () => {
  const initialOrderData: Order[] = [
    { appointmentID: 1, created: '2024-09-01', customer: 'Customer 1', totalPrice: 100, description: 'Service A Description', status: 'Done' },
    { appointmentID: 2, created: '2024-09-02', customer: 'Customer 2', totalPrice: 150, description: 'Service B Description', status: 'Done' },
    { appointmentID: 3, created: '2024-09-03', customer: 'Customer 3', totalPrice: 200, description: 'Service C Description', status: 'In process' },
    { appointmentID: 4, created: '2024-09-04', customer: 'Customer 4', totalPrice: 250, description: 'Service D Description', status: 'Done' },
    { appointmentID: 5, created: '2024-09-05', customer: 'Customer 5', totalPrice: 300, description: 'Service E Description', status: 'Done' },
    { appointmentID: 6, created: '2024-09-06', customer: 'Customer 6', totalPrice: 350, description: 'Service F Description', status: 'In process' },
    { appointmentID: 7, created: '2024-09-07', customer: 'Customer 7', totalPrice: 400, description: 'Service G Description', status: 'Cancel' },
    { appointmentID: 8, created: '2024-09-08', customer: 'Customer 8', totalPrice: 450, description: 'Service H Description', status: 'Cancel' },
    { appointmentID: 9, created: '2024-09-09', customer: 'Customer 9', totalPrice: 500, description: 'Service I Description', status: 'Cancel' },
    { appointmentID: 10, created: '2024-09-10', customer: 'Customer 10', totalPrice: 550, description: 'Service J Description', status: 'In process' },
    { appointmentID: 11, created: '2024-09-11', customer: 'Customer 11', totalPrice: 600, description: 'Service K Description', status: 'Done' },
    { appointmentID: 12, created: '2024-09-12', customer: 'Customer 12', totalPrice: 650, description: 'Service L Description', status: 'Done' },
    { appointmentID: 13, created: '2024-09-13', customer: 'Customer 13', totalPrice: 700, description: 'Service M Description', status: 'In process' },
    { appointmentID: 14, created: '2024-09-14', customer: 'Customer 14', totalPrice: 750, description: 'Service N Description', status: 'Done' },
    // ... thêm các đơn hàng khác
  ];

  const [orderData, setOrderData] = useState<Order[]>(initialOrderData);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const rowsPerPage = 5;

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    const modal = new window.bootstrap.Modal(document.getElementById('viewDetailsModal')!);
    modal.show();
  };

  const handleOpenDeleteModal = (order: Order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (selectedOrder) {
      setOrderData((prevData) => prevData.filter((order) => order.appointmentID !== selectedOrder.appointmentID));
      setShowDeleteModal(false);
      // alert(`Deleted appointment ID: ${selectedOrder.appointmentID}`);
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
    <div>
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
              <td>{order.created}</td>
              <td>{order.customer}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.description}</td>
              <td>
                <div className="dropdown">
                  <button className="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdown-basic" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdown-basic">
                    <li><a className="dropdown-item" href="#" onClick={() => handleViewDetail(order)}>View Detail</a></li>
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
      <div className="modal fade" id="viewDetailsModal" tabIndex={-1} aria-labelledby="viewDetailsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewDetailsModalLabel">Appointment Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedOrder && (
                <>
                  <p><strong>Appointment ID:</strong> {selectedOrder.appointmentID}</p>
                  <p><strong>Created Date:</strong> {selectedOrder.created}</p>
                  <p><strong>Customer Name:</strong> {selectedOrder.customer}</p>
                  <p><strong>Total Price:</strong> ${selectedOrder.totalPrice.toFixed(2)}</p>
                  <p><strong>Description:</strong> {selectedOrder.description}</p>
                  <p><strong>Status:</strong> {selectedOrder.status}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

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
