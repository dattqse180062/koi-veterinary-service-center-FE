import React, { useState } from 'react';

// Định nghĩa dữ liệu cho Feedback và Appointment
interface Feedback {
    feedback_id: number;
    rating: number;
    comment: string;
    date_time: string;
}

interface Appointment {
    appointment_id: number;
    created_date: string;
    service_name: string;
    customer_name: string;
    email: string;
    phone_number: string;
    // status: 'Done' | 'In process' | 'Cancel';
}

interface timeSlot {
    // feedback_id: number;
    appointment_id: Appointment;
    slot_id: number;
    year: number;
    month: number;
    day: number;
    slot_order: number;
    description: string;
    appointments: null | undefined;
}

const FeedbackAndRatingTable: React.FC = () => {
    // Dữ liệu mẫu cho Feedback và Appointment
    const initialFeedbackData: Feedback[] = [
        // { feedbackId: 1, rating: 5, comment: 'Great service', dateTime: '2024-09-01 12:30', appointmentID: 1 },
        // { feedbackId: 2, rating: 4, comment: 'Good service', dateTime: '2024-09-02 14:00', appointmentID: 2 },
        // { feedbackId: 3, rating: 3, comment: 'Average experience', dateTime: '2024-09-03 10:15', appointmentID: 3 },
        // { feedbackId: 4, rating: 4, comment: 'Satisfactory overall', dateTime: '2024-09-04 09:00', appointmentID: 4 },
        // { feedbackId: 5, rating: 2, comment: 'Could be better', dateTime: '2024-09-05 11:45', appointmentID: 5 },
        // { feedbackId: 6, rating: 5, comment: 'Absolutely fantastic', dateTime: '2024-09-06 08:30', appointmentID: 6 },
        // { feedbackId: 7, rating: 1, comment: 'Very disappointed', dateTime: '2024-09-07 15:00', appointmentID: 7 },
        // { feedbackId: 8, rating: 4, comment: 'Nice staff', dateTime: '2024-09-08 13:20', appointmentID: 8 },
        // { feedbackId: 9, rating: 3, comment: 'It was okay', dateTime: '2024-09-09 16:10', appointmentID: 9 },
        // { feedbackId: 10, rating: 5, comment: 'Highly recommend!', dateTime: '2024-09-10 10:45', appointmentID: 10 },
        // { feedbackId: 11, rating: 4, comment: 'Very professional', dateTime: '2024-09-11 12:00', appointmentID: 11 },
        // { feedbackId: 12, rating: 3, comment: 'Mediocre service', dateTime: '2024-09-12 14:30', appointmentID: 12 },
        // { feedbackId: 13, rating: 5, comment: 'Loved it!', dateTime: '2024-09-13 09:15', appointmentID: 13 },
        // { feedbackId: 14, rating: 2, comment: 'Not what I expected', dateTime: '2024-09-14 11:00', appointmentID: 14 },
        // { feedbackId: 15, rating: 4, comment: 'Good value for money', dateTime: '2024-09-15 13:45', appointmentID: 15 },
        // { feedbackId: 16, rating: 3, comment: 'Average at best', dateTime: '2024-09-16 10:30', appointmentID: 16 },
        // { feedbackId: 17, rating: 5, comment: 'Will come back again', dateTime: '2024-09-17 12:15', appointmentID: 17 },
        // { feedbackId: 18, rating: 4, comment: 'Happy with the results', dateTime: '2024-09-18 14:50', appointmentID: 18 },
        // { feedbackId: 19, rating: 3, comment: 'Nothing special', dateTime: '2024-09-19 09:40', appointmentID: 19 },
        // { feedbackId: 20, rating: 5, comment: 'Best experience ever', dateTime: '2024-09-20 11:25', appointmentID: 20 },
    ];

    const appointmentData: Appointment[] = [
        // { appointmentID: 1, created: '2024-09-01', customer: 'Customer 1', totalPrice: 100, description: 'Service A Description', status: 'Done' },
        // { appointmentID: 2, created: '2024-09-02', customer: 'Customer 2', totalPrice: 150, description: 'Service B Description', status: 'Done' },
        // { appointmentID: 3, created: '2024-09-03', customer: 'Customer 3', totalPrice: 200, description: 'Service C Description', status: 'In process' },
        // { appointmentID: 4, created: '2024-09-04', customer: 'Customer 4', totalPrice: 120, description: 'Service D Description', status: 'Done' },
        // { appointmentID: 5, created: '2024-09-05', customer: 'Customer 5', totalPrice: 180, description: 'Service E Description', status: 'Cancel' },
        // { appointmentID: 6, created: '2024-09-06', customer: 'Customer 6', totalPrice: 90, description: 'Service F Description', status: 'Done' },
        // { appointmentID: 7, created: '2024-09-07', customer: 'Customer 7', totalPrice: 130, description: 'Service G Description', status: 'In process' },
        // { appointmentID: 8, created: '2024-09-08', customer: 'Customer 8', totalPrice: 160, description: 'Service H Description', status: 'Done' },
        // { appointmentID: 9, created: '2024-09-09', customer: 'Customer 9', totalPrice: 200, description: 'Service I Description', status: 'Done' },
        // { appointmentID: 10, created: '2024-09-10', customer: 'Customer 10', totalPrice: 250, description: 'Service J Description', status: 'In process' },
        // { appointmentID: 11, created: '2024-09-11', customer: 'Customer 11', totalPrice: 110, description: 'Service K Description', status: 'Done' },
        // { appointmentID: 12, created: '2024-09-12', customer: 'Customer 12', totalPrice: 140, description: 'Service L Description', status: 'Cancel' },
        // { appointmentID: 13, created: '2024-09-13', customer: 'Customer 13', totalPrice: 170, description: 'Service M Description', status: 'Done' },
        // { appointmentID: 14, created: '2024-09-14', customer: 'Customer 14', totalPrice: 190, description: 'Service N Description', status: 'Done' },
        // { appointmentID: 15, created: '2024-09-15', customer: 'Customer 15', totalPrice: 80, description: 'Service O Description', status: 'In process' },
        // { appointmentID: 16, created: '2024-09-16', customer: 'Customer 16', totalPrice: 160, description: 'Service P Description', status: 'Done' },
        // { appointmentID: 17, created: '2024-09-17', customer: 'Customer 17', totalPrice: 210, description: 'Service Q Description', status: 'Done' },
        // { appointmentID: 18, created: '2024-09-18', customer: 'Customer 18', totalPrice: 130, description: 'Service R Description', status: 'Cancel' },
        // { appointmentID: 19, created: '2024-09-19', customer: 'Customer 19', totalPrice: 220, description: 'Service S Description', status: 'Done' },
        // { appointmentID: 20, created: '2024-09-20', customer: 'Customer 20', totalPrice: 300, description: 'Service T Description', status: 'Done' },
    ];

    const [feedbackData, setFeedbackData] = useState<Feedback[]>(initialFeedbackData);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [orderData, setOrderData] = useState<Feedback[]>(initialFeedbackData);

    const rowsPerPage = 5;

    const handleViewDetail = (feedback: Feedback) => {
        setSelectedFeedback(feedback);
        setShowDetailModal(true); // Hiển thị modal
    };

    const handleOpenDeleteModal = (feedback: Feedback) => {
        setSelectedFeedback(feedback);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (selectedFeedback) {
            setOrderData((prevData) => prevData.filter((order) => order.feedback_id !== selectedFeedback.feedback_id));
            setShowDeleteModal(false);
        }
    };


    // Lấy thông tin chi tiết của appointment từ feedback đã chọn
    const getAppointmentDetails = (appointmentID: number): Appointment | undefined => {
        return appointmentData.find((appointment) => appointment.appointment_id === appointmentID);
    };

    // Lấy thông tin chi tiết của time_slot từ appointment đã chọn
    const getTimeSlotDetails = (appointmentID: number): Appointment | undefined => {
        return appointmentData.find((time_slot) => time_slot.appointment_id === appointmentID);
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
            <h5 style={{ paddingTop: '65px' }}>Feedback and Rating Management</h5>
            <table className="table table-hover bg-white">
                <thead>
                    <tr>
                        <th>Feedback ID</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Date & Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((feedback) => (
                        <tr key={feedback.feedback_id}>
                            <td className="fw-bold">{feedback.feedback_id}</td>
                            <td>{feedback.rating}</td>
                            <td>{feedback.comment}</td>
                            <td>{feedback.date_time}</td>
                            <td>
                                {/* <button className="btn btn-link" onClick={() => handleViewDetail(feedback)}>View Detail</button> */}
                                <div className="dropdown">
                                    <button className="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdown-basic" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdown-basic">
                                        <li><a className="dropdown-item" href="#" onClick={() => handleViewDetail(feedback)}>View Detail</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => handleOpenDeleteModal(feedback)}>Delete</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal hiển thị chi tiết Feedback và Appointment */}
            {selectedFeedback && showDetailModal && (
                <div
                    className="modal fade show"
                    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="viewDetailsModalLabel"
                    aria-hidden={!showDetailModal}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="viewDetailsModalLabel">Feedback and Appointment Details</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDetailModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Feedback ID:</strong> {selectedFeedback.feedback_id}</p>
                                <p><strong>Rating:</strong> {selectedFeedback.rating}</p>
                                <p><strong>Comment:</strong> {selectedFeedback.comment}</p>
                                <p><strong>Date & Time:</strong> {selectedFeedback.date_time}</p>

                                {/* Hiển thị chi tiết từ bảng Appointment */}
                                {getAppointmentDetails(selectedFeedback.feedback_id) ? (
                                    <>
                                        <p><strong>Appointment ID:</strong> {getAppointmentDetails(selectedFeedback.feedback_id)?.appointment_id}</p>
                                        <p><strong>Created Date:</strong> {getAppointmentDetails(selectedFeedback.feedback_id)?.created_date}</p>
                                        <p><strong>Customer Name:</strong> {getAppointmentDetails(selectedFeedback.feedback_id)?.customer_name}</p>
                                        {/* <p><strong>Total Price:</strong> ${getAppointmentDetails(selectedFeedback.feedback_id)?.totalPrice.toFixed(2)}</p> */}
                                        <p><strong>Email:</strong> {getAppointmentDetails(selectedFeedback.feedback_id)?.email}</p>
                                        <p><strong>Phone Number:</strong> {getAppointmentDetails(selectedFeedback.feedback_id)?.phone_number}</p>
                                        <p><strong>Service Name:</strong> {getAppointmentDetails(selectedFeedback.feedback_id)?.service_name}</p>
                                        {/* <p><strong>Status:</strong> {getAppointmentDetails(selectedFeedback.feedback_id)?.status}</p> */}
                                        {/* Access the `time_slot` prop to display data */}
                                        {/* <p><strong>Time Slot:</strong> {getTimeSlotDetails(selectedFeedback.feedback_id)?.}</p> */}
                                        
                                    </>
                                ) : (
                                    <p>No appointment details available.</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                <p>Are you sure you want to delete feedback ID: {selectedFeedback?.feedback_id}?</p>
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

export default FeedbackAndRatingTable;
