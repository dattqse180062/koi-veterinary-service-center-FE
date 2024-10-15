import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { updateAppointmentStatus, createMedicalReport } from '../../api/appointmentApi';
// import { setAppointmentDetails } from '../../redux/actions/appointmentActions';

const AppointmentDetails: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appointment = useSelector((state: any) => state.appointmentDetails);
    const [status, setStatus] = useState(appointment.current_status);
    const [report, setReport] = useState('');

    useEffect(() => {
        if (!appointment) {
            navigate('/doctorschedule'); // Redirect if no appointment details
        }
    }, [appointment, navigate]);

    const handleUpdateStatus = async () => {
        try {
            // await updateAppointmentStatus(appointment.id, { status });
            alert('Status updated successfully!');
            // Optionally refresh appointment details or go back
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleCreateReport = async () => {
        try {
            // await createMedicalReport(appointment.id, { report });
            alert('Report created successfully!');
            setReport('');
        } catch (error) {
            console.error('Error creating report:', error);
        }
    };

    return (
        <div className="container">
            <h2>Appointment Details</h2>
            <div>
                <h5>Status: {status}</h5>
                <label htmlFor="status-select">Update Status:</label>
                <select id="status-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="CHECKED_IN">Checked In</option>
                    <option value="CANCEL">Cancel</option>
                    <option value="ON_GOING">On Going</option>
                    <option value="DONE">Done</option>
                </select>
                <button className="btn btn-primary" onClick={handleUpdateStatus}>Update Status</button>
            </div>
            <div>
                <h5>Create Medical Report</h5>
                <textarea
                    rows={4}
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                    placeholder="Enter medical report here..."
                />
                <button className="btn btn-success" onClick={handleCreateReport}>Create Report</button>
            </div>
            <button className="btn btn-secondary mt-3" onClick={() => navigate('/doctorschedule')}>Back to Schedule</button>
        </div>
    );
};

export default AppointmentDetails;
