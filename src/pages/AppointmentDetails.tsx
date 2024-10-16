import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAppointmentDetails, updateAppointmentStatus, createMedicalReport, getMedicalReport } from '../../src/api/appointmentApi';

interface AppointmentDetailsProps {}

interface StatusUpdate {
    current_status: string;
}

interface MedicalReport {
    veterinarian_id: number;
    conclusion: string;
    advise: string;
    prescription_id: number;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>();
    const [appointment, setAppointment] = useState<any | null>(null);
    const [newStatus, setNewStatus] = useState<string>('');
    const [medicalReport, setMedicalReport] = useState<MedicalReport | null>({
        veterinarian_id: 0,
        conclusion: '',
        advise: '',
        prescription_id: 0
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [isReportVisible, setIsReportVisible] = useState<boolean>(false);

    useEffect(() => {
        const loadAppointment = async () => {
            try {
                if (appointmentId) {
                    const data = await getAppointmentDetails(Number(appointmentId));
                    console.log(data);
                    setAppointment(data);
                    setNewStatus(data.current_status);
                    setLoading(false);

                    // Check if a medical report exists
                    try {
                        const report = await getMedicalReport(Number(appointmentId));
                        if (report) {
                            setMedicalReport({
                                veterinarian_id: report.veterinarian_id,
                                conclusion: report.conclusion,
                                advise: report.advise,
                                prescription_id: report.prescription_id
                            });
                        }
                    } catch (error) {
                        console.error('Error fetching medical report:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching appointment:', error);
            }
        };
        loadAppointment();
    }, [appointmentId]);

    const handleStatusUpdate = async () => {
        try {
            if (appointmentId && newStatus) {
                const statusUpdate: StatusUpdate = { current_status: newStatus };
                await updateAppointmentStatus(Number(appointmentId), statusUpdate);
                alert('Appointment status updated successfully!');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleReportSubmit = async () => {
        try {
            if (appointmentId && medicalReport) {
                const report: MedicalReport = {
                    veterinarian_id: appointment.veterinarian.user_id,
                    conclusion: medicalReport.conclusion,
                    advise: medicalReport.advise,
                    prescription_id: medicalReport.prescription_id
                };

                await createMedicalReport(Number(appointmentId), report);
                alert('Medical report created successfully!');

                const updatedReport = await getMedicalReport(Number(appointmentId));
                setMedicalReport(updatedReport ? {
                    veterinarian_id: updatedReport.veterinarian_id,
                    conclusion: updatedReport.conclusion,
                    advise: updatedReport.advise,
                    prescription_id: updatedReport.prescription_id
                } : null);
            }
        } catch (error) {
            console.error('Error creating report:', error);
        }
    };

    const toggleReportVisibility = () => {
        setIsReportVisible(!isReportVisible);
    };

    if (loading) {
        return <p>Loading appointment details...</p>;
    }

    return (
        <div className="container-fluid vh-100 text-start d-flex align-items-center justify-content-center">

            {appointment && (
                <div className="row " style={{width:"80%"}}>
                    {/* Left Column - Appointment Details */}
                    <div className="col-md-7">

                        <div className="appointment-info">
                            <h2 className="text-start" style={{fontWeight:"bold", color:"#02033B", fontSize:"2rem"}}>Appointment Details</h2>
                            <p><strong>Appointment ID:</strong> {appointment.appointment_id}</p>
                            <p><strong>Status:</strong> {appointment.current_status}</p>
                            <p><strong>Customer Name:</strong> {appointment.customer_name}</p>
                            <p><strong>Customer Email:</strong> {appointment.email}</p>
                            <p><strong>Customer Phone:</strong> {appointment.phone_number}</p>

                            {appointment.address && (
                                <p><strong>Customer Address: </strong>
                                    {appointment.address.home_number}/ {appointment.address.ward}/ {appointment.address.district}/ {appointment.address.city}
                                </p>
                            )}

                            <p><strong>Service:</strong> {appointment.service.service_name}</p>
                            <p><strong>Description:</strong> {appointment.description}</p>
                        </div>
                    </div>

                    {/* Right Column - Fish Information & Medical Report */}
                    <div className="col-md-5">
                        {/* Fish Information */}
                        {appointment.fish && (
                            <div className="fish-info mb-4">
                                <h3 className="text-start" style={{fontWeight:"bold", color:"#02033B", fontSize:"2rem"}}>Fish Information</h3>

                                <p><strong>Species:</strong> {appointment.fish.species}</p>
                                <p><strong>Gender:</strong> {appointment.fish.gender}</p>
                                <p><strong>Age:</strong> {appointment.fish.age}</p>
                                <p><strong>Size:</strong> {appointment.fish.size} cm</p>
                                <p><strong>Weight:</strong> {appointment.fish.weight} kg</p>
                                <p><strong>Color:</strong> {appointment.fish.color}</p>
                                <p><strong>Origin:</strong> {appointment.fish.origin}</p>
                            </div>
                        )}

                        {/* Medical Report Section */}
                        <div className="medical-report">
                            <h3>{medicalReport ? 'View Medical Report' : 'Create Medical Report'}</h3>
                            {medicalReport && medicalReport.conclusion ? (
                                <div>
                                    <p><strong>Conclusion:</strong> {medicalReport.conclusion}</p>
                                    <p><strong>Advise:</strong> {medicalReport.advise}</p>

                                    <button className="btn btn-secondary mt-2" onClick={toggleReportVisibility}>
                                        Edit Medical Report
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <textarea
                                        className="form-control"
                                        rows={2}
                                        value={medicalReport?.conclusion || ''}
                                        onChange={(e) => setMedicalReport((prev) => ({
                                            ...(prev || { veterinarian_id: 0, conclusion: '', advise: '', prescription_id: 0 }),
                                            conclusion: e.target.value
                                        }) as MedicalReport)}
                                        placeholder="Enter conclusion here"
                                    />
                                    <button className="btn btn-success mt-2" onClick={handleReportSubmit}>
                                        Submit Report
                                    </button>
                                </>
                            )}

                            {isReportVisible && !medicalReport && (
                                <div>
                                    <h4>Create medical report</h4>
                                    <textarea
                                        className="form-control mt-2"
                                        rows={3}
                                        placeholder="Conclusion"
                                        onChange={(e) => setMedicalReport((prev) => ({
                                            ...(prev || { veterinarian_id: 0, conclusion: '', advise: '', prescription_id: 0 }),
                                            conclusion: e.target.value
                                        }) as MedicalReport)}
                                    />
                                    <textarea
                                        className="form-control mt-2"
                                        rows={3}
                                        placeholder="Advise"
                                        onChange={(e) => setMedicalReport((prev) => ({
                                            ...(prev || { veterinarian_id: 0, conclusion: '', advise: '', prescription_id: 0 }),
                                            advise: e.target.value
                                        }) as MedicalReport)}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Prescription ID"
                                        className="form-control mt-2"
                                        onChange={(e) => setMedicalReport((prev) => ({
                                            ...(prev || { veterinarian_id: 0, conclusion: '', advise: '', prescription_id: 0 }),
                                            prescription_id: Number(e.target.value)
                                        }) as MedicalReport)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentDetails;
