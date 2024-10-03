import React, { useState } from 'react';

interface Staff {
  staffId: number;
  avatar: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  isActive: boolean; // New field to track account status (enabled/disabled)
}

const initialStaff: Staff[] = [
  { staffId: 1, avatar: 'passed-stamp_1017-8239.jpg', email: 'vajohem349@abatido.com', phoneNumber: '1234567890', firstName: 'Ahlam', lastName: 'Ges', isActive: true },
  { staffId: 2, avatar: 'passed-stamp_1017-8239.jpg', email: 'vsdsdf@abatido.com', phoneNumber: '0987654321', firstName: 'John', lastName: 'Doe', isActive: true },
  { staffId: 3, avatar: 'passed-stamp_1017-8239.jpg', email: 'jane.smith@example.com', phoneNumber: '3456789012', firstName: 'Jane', lastName: 'Smith', isActive: false },
  { staffId: 4, avatar: 'passed-stamp_1017-8239.jpg', email: 'mike.johnson@example.com', phoneNumber: '4567890123', firstName: 'Mike', lastName: 'Johnson', isActive: true },
  { staffId: 5, avatar: 'passed-stamp_1017-8239.jpg', email: 'emily.brown@example.com', phoneNumber: '5678901234', firstName: 'Emily', lastName: 'Brown', isActive: true },
  { staffId: 6, avatar: 'passed-stamp_1017-8239.jpg', email: 'david.lee@example.com', phoneNumber: '6789012345', firstName: 'David', lastName: 'Lee', isActive: false },
  { staffId: 7, avatar: 'passed-stamp_1017-8239.jpg', email: 'sarah.wilson@example.com', phoneNumber: '7890123456', firstName: 'Sarah', lastName: 'Wilson', isActive: true },
  { staffId: 8, avatar: 'passed-stamp_1017-8239.jpg', email: 'alex.taylor@example.com', phoneNumber: '8901234567', firstName: 'Alex', lastName: 'Taylor', isActive: true },
  { staffId: 9, avatar: 'passed-stamp_1017-8239.jpg', email: 'olivia.martinez@example.com', phoneNumber: '9012345678', firstName: 'Olivia', lastName: 'Martinez', isActive: false },
  { staffId: 10, avatar: 'passed-stamp_1017-8239.jpg', email: 'daniel.anderson@example.com', phoneNumber: '0123456789', firstName: 'Daniel', lastName: 'Anderson', isActive: true },
  { staffId: 11, avatar: 'passed-stamp_1017-8239.jpg', email: 'sophia.garcia@example.com', phoneNumber: '1122334455', firstName: 'Sophia', lastName: 'Garcia', isActive: true }
];

const StaffTable: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newStaff, setNewStaff] = useState<Staff>({
    staffId: staff.length + 1,
    avatar: 'passed-stamp_1017-8239.jpg',
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    isActive: true
  });

  const handleAddCustomer = () => {
    setStaff([...staff, newStaff]);
    setNewStaff({
      staffId: staff.length + 1,
      avatar: 'passed-stamp_1017-8239.jpg',
      email: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      isActive: true
    });
    setShowAddModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };

  const handleUpdateStaff = (updatedStaff: Staff) => {
    const updatedStaffList = staff.map((s) => (s.staffId === updatedStaff.staffId ? updatedStaff : s));
    setStaff(updatedStaffList);
    setShowDetailsModal(false);
  };

  const toggleAccountStatus = () => {
    if (selectedStaff) {
      const updatedStaff = { ...selectedStaff, isActive: !selectedStaff.isActive };
      handleUpdateStaff(updatedStaff);
    }
  };
  // SERVICE FOR PAGINATION
  const rowsPerPage = 5;
  const indexOfLastCustomer = currentPage * rowsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - rowsPerPage;
  const currentCustomers = staff.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(staff.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-3">
      <h5 style={{ paddingTop: '65px' }}>Staff Management</h5>

      <div className="d-flex mb-3">
        {/* Search customer */}
        <div className="input-group input-group-sm me-2" style={{ width: '200px' }}>
          <input type="text" className="form-control" placeholder="Search staff..." />
        </div>
        {/* New Customer Button */}
        <button className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#newStaffModal" >
          + New Customer
        </button>
      </div>

      {/* Staff Table */}
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
          {currentCustomers.map((s) => (
            <tr key={s.staffId}>
              <td>
                <img src={s.avatar} alt={s.firstName} className="rounded-circle" style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{`${s.firstName} ${s.lastName}`}</td>
              <td>{s.email}</td>
              <td>{s.phoneNumber}</td>
              <td>
                <div className="dropdown">
                  <button className="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdown-basic" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdown-basic">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          setSelectedStaff(s);
                          setShowDetailsModal(true);
                        }}
                      >
                        View Detail
                      </a>
                    </li>
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

      {/* Modal for Viewing/Updating Staff Details */}
      {showDetailsModal && selectedStaff && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View & Update Staff Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowDetailsModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="avatar" className="" style={{ float: 'left', paddingBottom: '4px' }}>Avatar URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="avatar"
                    value={selectedStaff.avatar}
                    onChange={(e) => setSelectedStaff({ ...selectedStaff, avatar: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="" style={{ float: 'left', paddingBottom: '4px' }}>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={selectedStaff.firstName}
                    onChange={(e) => setSelectedStaff({ ...selectedStaff, firstName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="" style={{ float: 'left', paddingBottom: '4px' }}>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={selectedStaff.lastName}
                    onChange={(e) => setSelectedStaff({ ...selectedStaff, lastName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="" style={{ float: 'left', paddingBottom: '4px' }}>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={selectedStaff.email}
                    onChange={(e) => setSelectedStaff({ ...selectedStaff, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="" style={{ float: 'left', paddingBottom: '4px' }}>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    value={selectedStaff.phoneNumber}
                    onChange={(e) => setSelectedStaff({ ...selectedStaff, phoneNumber: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label>Status: </label>
                  <span>{selectedStaff.isActive ? ' Enabled' : ' Disabled'}</span>
                  <button
                    className={`btn ms-2 ${selectedStaff.isActive ? 'btn-danger' : 'btn-success'}`}
                    onClick={toggleAccountStatus}
                  >
                    {selectedStaff.isActive ? 'Disable' : 'Enable'} Account
                  </button>
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDetailsModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={() => handleUpdateStaff(selectedStaff)}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding New Staff */}
      <div className={`modal fade ${showAddModal ? 'show' : ''}`} id="newStaffModal" tabIndex={-1} aria-labelledby="newStaffModalLabel" aria-hidden={!showAddModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newStaffModalLabel">Add New Staff</h5>
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
                  value={newStaff.avatar}
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
                  value={newStaff.firstName}
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
                  value={newStaff.lastName}
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
                  value={newStaff.email}
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
                  value={newStaff.phoneNumber}
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

export default StaffTable;

