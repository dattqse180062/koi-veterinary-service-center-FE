import React, { useState, useEffect } from 'react';
import '../../../styles/FeedbackAndRatingTable.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../layout/Sidebar';
import TableComponent from '../../table/TableComponent';

// Định nghĩa dữ liệu cho Feedback và Appointment
interface Feedback {
    feedback_id: string;
    rating: number;
    comment: string;
    date_time: string;
    appointment: Appointment; // Thêm appointment vào Feedback
}

interface Appointment {
    appointment_id: number;
    created_date: string;
    service_name: string;
    customer_name: string;
    email: string;
    phone_number: string;
    time_slot?: TimeSlot; // Thêm time_slot vào Appointment
}

interface TimeSlot {
    slot_id: number;
    year: number;
    month: number;
    day: number;
    slot_order: number;
    description: string;
    appointments: any; // Có thể điều chỉnh theo nhu cầu của bạn
}

const FeedbackTable: React.FC = () => {


    // const [feedbackData, setFeedbackData] = useState<Feedback[]>([]); // State để lưu trữ danh sách feedback
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);  // State để lưu trữ feedback đã chọn cho việc hiển thị chi tiết
    const columns = ['feedback_id', 'rating', 'comment', 'date_time'];
    const columnHeaders = ['Feedback ID', 'Rating', 'Comment', 'Date & Time'];
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false); // State để kiểm soát việc hiển thị modal chi tiết feedback
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // State để kiểm soát việc hiển thị modal xác nhận xóa feedback
    const [currentPage, setCurrentPage] = useState<number>(1); // State để theo dõi trang hiện tại trong phân trang
    const [orderData, setOrderData] = useState<Feedback[]>([]);  // State để lưu trữ danh sách feedback từ API
    const rowsPerPage = 5; // Số hàng hiển thị trên mỗi trang
    // const handleMove = 
    const navigate = useNavigate();


    // Fetch feedback data from the API when the component mounts
    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const response = await axios.get('https://66fff3374da5bd2375529fe6.mockapi.io/api/v2/feedbackdetails');
                setOrderData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchFeedbackData();
    }, []);

    const handleViewDetail = (feedbackId: number) => {
        // setSelectedFeedback(feedback);
        // setShowDetailModal(true); // Hiển thị modal
        navigate(`/feedback-details/`, { state: { feedbackId } }); // Điều hướng đến trang chi tiết
        // navigate(`/feedback-details`); // Điều hướng đến trang chi tiết
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

    const indexOfLastOrder = currentPage * rowsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
    const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orderData.length / rowsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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
                                <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                            </div>
                            <div className="modal-body" style={{ textAlign: 'left' }}>
                                <p><strong>Feedback ID:</strong> {selectedFeedback.feedback_id}</p>
                                <p><strong>Rating:</strong> {selectedFeedback.rating}</p>
                                <p><strong>Comment:</strong> {selectedFeedback.comment}</p>
                                <p><strong>Date & Time:</strong> {new Date(selectedFeedback.date_time).toLocaleDateString('en-GB')}</p>

                                {/* Hiển thị chi tiết từ bảng Appointment */}
                                {selectedFeedback.appointment ? (
                                    <>
                                        <p><strong>Appointment ID:</strong> {selectedFeedback.appointment.appointment_id}</p>
                                        <p><strong>Created Date:</strong> {new Date(selectedFeedback.appointment.created_date).toLocaleDateString('en-GB')}</p>
                                        <p><strong>Customer Name:</strong> {selectedFeedback.appointment.customer_name}</p>
                                        <p><strong>Email:</strong> {selectedFeedback.appointment.email}</p>
                                        <p><strong>Phone Number:</strong> {selectedFeedback.appointment.phone_number}</p>
                                        <p><strong>Service Name:</strong> {selectedFeedback.appointment.service_name}</p>

                                        {/* Hiển thị chi tiết từ bảng Time Slot */}
                                        {selectedFeedback.appointment.time_slot ? (
                                            <>
                                                <p><strong>Time Slot ID:</strong> {selectedFeedback.appointment.time_slot.slot_id}</p>
                                                <p><strong>Description:</strong> {selectedFeedback.appointment.time_slot.description}</p>
                                                <p><strong>Date:</strong> {`${selectedFeedback.appointment.time_slot.day}-${selectedFeedback.appointment.time_slot.month}-${selectedFeedback.appointment.time_slot.year}`}</p>
                                                <p><strong>Slot Order:</strong> {selectedFeedback.appointment.time_slot.slot_order}</p>
                                            </>
                                        ) : (
                                            <p>No time slot details available.</p>
                                        )}
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
            {/* <nav aria-label="Page navigation">
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
            </nav> */}

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

export default FeedbackTable;

