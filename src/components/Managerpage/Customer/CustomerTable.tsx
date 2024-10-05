import React, { useState } from 'react';

interface Customer {
  avatar: string;
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

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

const CustomerAccountTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    avatar: '',
    customerId: customers.length + 1,
    firstName: '', lastName: '',
    email: '',
    phoneNumber: ''
  });

  const rowsPerPage = 5;
  const indexOfLastCustomer = currentPage * rowsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - rowsPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(customers.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteCustomer = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter((customer) => customer.customerId !== selectedCustomer.customerId));
      setShowDeleteConfirmModal(false);
    }
  };

  const handleAddCustomer = () => {
    setCustomers([...customers, newCustomer]);
    setNewCustomer({
      avatar: '',
      customerId: customers.length + 1,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    });
    setShowAddModal(false);
  };

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDeleteConfirmModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  return (
    <div>
      <h5 style={{ paddingTop: '65px' }}>Customer Management</h5>
      {/* Header of content */}
      <div className="d-flex mb-3">
        {/* Search customer */}
        <div className="input-group input-group-sm me-2" style={{ width: '200px' }}>
          <input type="text" className="form-control" placeholder="Search customer..." />
        </div>
        {/* New Customer Button */}
        <button className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#newCustomerModal" >
          + New Customer
        </button>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer) => (
            <tr key={customer.customerId}>
              <td><img src={customer.avatar} alt={customer.firstName} className="rounded-circle" style={{ width: '50px', height: '50px' }} /></td>
              <td>{`${customer.firstName} ${customer.lastName}`}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneNumber}</td>
              <td>
                <div className="dropdown">
                  <button className="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdown-basic" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdown-basic">
                    <li><a className="dropdown-item" href="#" onClick={() => handleViewDetails(customer)}>View Detail</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleDeleteClick(customer)}>Delete</a></li>
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
      {selectedCustomer && (
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
                {selectedCustomer && (
                  <>
                    <p><strong>Full Name:</strong> {`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}</p>
                    <p><strong>Email:</strong> {selectedCustomer.email}</p>
                    <p><strong>Phone Number:</strong> {selectedCustomer.phoneNumber}</p>
                    <p><strong>Avatar URL:</strong> {selectedCustomer.avatar}</p>
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


      {/* Delete Confirmation Modal */}
      {selectedCustomer && (
        <div
          className={`modal fade ${showDeleteConfirmModal ? 'show' : ''}`}
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
          style={{ display: showDeleteConfirmModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete {`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirmModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteCustomer}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding New Customer */}
      {/* <div className="modal fade" id="newCustomerModal" tabIndex={-1} aria-labelledby="newCustomerModalLabel" aria-hidden="true"> */}
      <div className={`modal fade ${showAddModal ? 'show' : ''}`} id="newCustomerModal" tabIndex={-1} aria-labelledby="newCustomerModalLabel" aria-hidden={!showAddModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newCustomerModalLabel">Add New Customer</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowAddModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="avatar" className="" style={{ float: 'left', paddingBottom: '4px' }}>Avatar URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="avatar"
                  name="avatar"
                  value={newCustomer.avatar}
                  onChange={handleInputChange}
                  placeholder="Enter avatar URL"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="firstName" className="" style={{ float: 'left', paddingBottom: '4px' }}>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={newCustomer.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="" style={{ float: 'left', paddingBottom: '4px' }}>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={newCustomer.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="" style={{ float: 'left', paddingBottom: '4px' }}>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber" className="" style={{ float: 'left', paddingBottom: '4px' }}>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={newCustomer.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowAddModal(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAddCustomer}>Add Customer</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default CustomerAccountTable;
