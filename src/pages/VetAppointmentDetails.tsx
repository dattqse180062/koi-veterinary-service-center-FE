import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    getAppointmentDetails,
    getMedicalReport,
    createMedicalReport,
    getMedicines,
    createPrescription,
    fetchPrescriptionDetails, updateAppointmentStatus, updateDoneStatus
} from '../../src/api/appointmentApi';
import "../styles/Appointment.css";
import {useAuth} from "../hooks/context/AuthContext";

interface Medicine {
    medicine_id: number;
    medicine_name: string;
}

interface Prescription {
    prescription_id: number | null;
    instruction: string;
    medicines: { medicine_id: number; quantity: number }[];
}

interface MedicalReport {
    veterinarian_id: number;
    conclusion: string;
    advise: string;
    prescription_id: number;
}

const VetAppointmentDetails: React.FC = () => {
    const { user } = useAuth();
    const vetId = user?.userId;
    const navigate = useNavigate();

    const { appointmentId } = useParams<{ appointmentId: string }>();
    const [appointment, setAppointment] = useState<any | null>(null);
    const [medicalReport, setMedicalReport] = useState<MedicalReport | null>(null);
    const [isReportVisible, setIsReportVisible] = useState<boolean>(false);
    const [isCreatingReport, setIsCreatingReport] = useState<boolean>(false);
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [prescription, setPrescription] = useState<Prescription | null>(null);
    const [isMedicineValid, setIsMedicineValid] = useState<boolean[]>([]);
    const [isQuantityValid, setIsQuantityValid] = useState<boolean[]>([]);

    const [newReport, setNewReport] = useState<MedicalReport>({
        veterinarian_id: 0,
        conclusion: '',
        advise: '',
        prescription_id: 0
    });

    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            try {
                const appointmentData = await getAppointmentDetails(Number(appointmentId));
                setAppointment(appointmentData);

                // Fetch medical report if it exists
                const report = await getMedicalReport(Number(appointmentId));
                if (report) {
                    setMedicalReport(report);
                    if (report.prescription_id) {

                        const prescriptionData = await fetchPrescriptionDetails(report.prescription_id);
                        setPrescription(prescriptionData);
                    }
                }
            } catch (error) {
                console.error('Error fetching appointment details:', error);
            }
        };

        const fetchMedicines = async () => {
            try {
                const medicineData = await getMedicines();

                setMedicines(medicineData);
            } catch (error) {
                console.error('Error fetching medicines:', error);
            }
        };

        fetchAppointmentDetails();
        fetchMedicines();
    }, [appointmentId]);

    const toggleReportModal = () => {
        // Nếu bạn chỉ cần đóng modal mà không cần thay đổi trạng thái khác, có thể đặt giá trị cụ thể
        if (isCreatingReport) {
            setIsCreatingReport(false); // Đóng modal tạo báo cáo
        }
        setIsReportVisible(!isReportVisible); // Đóng modal xem báo cáo
    };

    const handleCreateReport = async () => {
        try {
            let valid = true;

            // Check that both the report fields are filled
            if (!newReport.conclusion.trim() || !newReport.advise.trim()) {
                alert('Conclusion and advise cannot be empty.');
                valid = false;
            }

            if (prescription) {
                const medicineValidation = prescription.medicines.map((med) => {
                    return med.medicine_id !== 0; // Check if medicine_id is valid
                });
                const quantityValidation = prescription.medicines.map((med) => {
                    return med.quantity > 0; // Check if quantity is greater than 0
                });

                setIsMedicineValid(medicineValidation);
                setIsQuantityValid(quantityValidation);

                // Check overall validity
                valid = medicineValidation.every(Boolean) && quantityValidation.every(Boolean);
            }

            if (!valid) {

                alert('Please correct the highlighted fields.'); // Optional, can be removed
                return; // Prevent further execution
            }
            if (window.confirm('Are you sure you want to save the report?')) {
            let prescriptionData;
            if (prescription) {

                prescriptionData = await createPrescription(prescription);

            } else {
                prescriptionData = { prescription_id: null }; // Handle this case according to your API's needs
            }


            if (vetId === undefined) {
                alert('User ID is not available. Cannot create medical report.');
                return; // Prevent further execution
            }

            const newMedicalReport = {
                ...newReport,
                prescription_id: prescriptionData.prescription_id,
                veterinarian_id: vetId
            };
            await createMedicalReport(Number(appointmentId), newMedicalReport);
            alert('Report created successfully!');

            setIsCreatingReport(false);
            toggleReportModal();
            window.location.reload();
            }
        } catch (error) {
            console.error('Error creating report:', error);
        }
    };

    const handleAddMedicine = () => {
        if (!prescription) {
            setPrescription({
                prescription_id: null,
                instruction: '',
                medicines: [{ medicine_id: 0, quantity: 1 }]
            });
        } else {
            const updatedPrescription = {
                ...prescription,
                medicines: [...prescription.medicines, { medicine_id: 0, quantity: 1 }]
            };
            setPrescription(updatedPrescription);
        }
        // Update validity state
        setIsMedicineValid([...isMedicineValid, true]); // Default to invalid
        setIsQuantityValid([...isQuantityValid, true]); // Quantity defaults to 1, which is valid
    };

    const handleRemoveMedicine = (index: number) => {
        if (prescription) {
            const updatedMedicines = prescription.medicines.filter((_, idx) => idx !== index);
            setPrescription({ ...prescription, medicines: updatedMedicines });
            // Remove validation for the removed medicine
            const updatedMedicineValid = [...isMedicineValid];
            updatedMedicineValid.splice(index, 1);
            setIsMedicineValid(updatedMedicineValid);
            const updatedQuantityValid = [...isQuantityValid];
            updatedQuantityValid.splice(index, 1);
            setIsQuantityValid(updatedQuantityValid);
        }
    };

    const handleMedicineChange = (index: number, field: string, value: any) => {
        if (prescription) {
            const updatedMedicines = prescription.medicines.map((medicine, idx) =>
                idx === index ? { ...medicine, [field]: value === "" ? 0 : value } : medicine
            );
            setPrescription({ ...prescription, medicines: updatedMedicines });

            // Update validity based on the change
            if (field === 'medicine_id') {
                const updatedValidity = [...isMedicineValid];
                updatedValidity[index] = value !== "0"; // Update validity based on selection
                setIsMedicineValid(updatedValidity);
            } else if (field === 'quantity') {
                const updatedValidity = [...isQuantityValid];
                updatedValidity[index] = Number(value) > 0; // Update validity based on quantity
                setIsQuantityValid(updatedValidity);
            }
        }
    };

    const handleBack = () => {
        navigate('/veterinarian-schedule');
    };

    const handleFinish = async () => {
        const confirmFinish = window.confirm('Are you sure you want to mark this appointment as done?');
        if (!confirmFinish) {
            return; // Exit the function if the user cancels
        }
        try {
            const result = await updateDoneStatus(Number(appointmentId), "DONE");
            alert('Appointment marked as done!');
            console.log('Update Result:', result);
            window.location.reload();
            // navigate('/veterinarian-schedule');
        } catch (error) {
            console.error('Error finishing appointment:', error);
            alert('Failed to mark appointment as done. Please try again.');
        }
    };

    return (
        <div className="container-fluid vh-100 text-start d-flex align-items-center justify-content-center">
            <button className="btn btn-secondary back-button" onClick={handleBack}>
                Back
            </button>
            {appointment && (
                <div className="row " style={{width: "80%"}}>
                    {/* Left Column - Appointment Details */}
                    <div className="col-md-8">

                        <div className="appointment-info">
                            <h2 className="text-start appointment-title">Appointment Details</h2>
                            <p><strong>Appointment ID:</strong> {appointment.appointment_id}</p>
                            <p><strong>Status:</strong> <span className={`fw-bold ${
                                appointment.current_status === 'PENDING' ? 'text-warning' :
                                    appointment.current_status === 'CONFIRMED' ? 'text-primary' :
                                        appointment.current_status === 'CHECKED_IN' ? 'text-info' :
                                            appointment.current_status === 'CANCEL' ? 'text-danger' :
                                                appointment.current_status === 'ON_GOING' ? 'text-secondary' :
                                                    appointment.current_status === 'DONE' ? 'text-success' : ''
                            }`}>
                               {appointment.current_status}
                            </span></p>
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
                            {medicalReport && appointment.current_status === 'ON_GOING' &&(
                                <button className="btn btn-secondary mt-3" onClick={handleFinish}>
                                    Finish
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Fish Information & Medical Report */}
                    <div className="col-md-4">
                        {/* Fish Information */}
                        {appointment.fish && (
                            <div className="fish-info mb-4">
                                <h3 className="text-start appointment-title">Fish Information</h3>

                                <p><strong>Species:</strong> {appointment.fish.species}</p>
                                <p><strong>Gender:</strong> {appointment.fish.gender}</p>
                                <p><strong>Age:</strong> {appointment.fish.age}</p>
                                <p><strong>Size:</strong> {appointment.fish.size} cm</p>
                                <p><strong>Weight:</strong> {appointment.fish.weight} kg</p>
                                <p><strong>Color:</strong> {appointment.fish.color}</p>
                                <p><strong>Origin:</strong> {appointment.fish.origin}</p>
                            </div>
                        )}

                        <div className="col-md-12">
                            <h3 className="text-start appointment-title">Medical Report</h3>

                            {!medicalReport && (
                                <button className="btn btn-primary" onClick={() => setIsCreatingReport(true)}>
                                    Create Report
                                </button>
                            )}

                            {medicalReport && (
                                <button className="btn btn-success" onClick={toggleReportModal}>
                                    View Report
                                </button>
                            )}



                            {isReportVisible && medicalReport && (
                                <div className="modal fade show" tabIndex={-1}
                                     style={{display: 'block', background: 'rgba(0, 0, 0, 0.7)'}}>
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                        <span

                                            className="close-icon"
                                            onClick={toggleReportModal}

                                        >
                                            &times; {/* Dấu X */}
                                        </span>
                                            <div className="modal-header">
                                                <h5 className="modal-title appointment-title"
                                                    style={{fontSize: "1.6rem"}}>Medical Report</h5>

                                            </div>
                                            <div className="modal-body">
                                                <p><strong>Conclusion:</strong> {medicalReport.conclusion}</p>
                                                <p><strong>Advise:</strong> {medicalReport.advise}</p>
                                                {/* Display Prescription Information */}

                                            </div>
                                            {prescription && (
                                                <div>
                                                    <div className="modal-header">
                                                        <h5 className="modal-title appointment-title"
                                                            style={{fontSize: "1.6rem"}}>Prescription</h5>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p><strong>Instructions:</strong> {prescription.instruction}</p>
                                                        <ul>
                                                            {prescription.medicines.map((med, index) => {
                                                                const medicineDetail = medicines.find(m => m.medicine_id === med.medicine_id);
                                                                return (
                                                                    <li key={index}>
                                                                        {medicineDetail ? medicineDetail.medicine_name : 'Unknown Medicine'} (Quantity: {med.quantity})
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isCreatingReport && (
                                <div className="modal" tabIndex={-1}
                                     style={{display: 'block', background: 'rgba(0, 0, 0, 0.7)'}}>
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                        <span

                                            className="close-icon"
                                            onClick={toggleReportModal}

                                        >
                                            &times; {/* Dấu X */}
                                        </span>
                                            <div className="modal-header">
                                                <h5 className="modal-title appointment-title"
                                                    style={{fontSize: "1.9rem"}}>Create Medical Report</h5>
                                            </div>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label className="form-label">Conclusion</label>
                                                    <input type="text" className="form-control"
                                                           value={newReport.conclusion}
                                                           onChange={(e) => setNewReport({
                                                               ...newReport,
                                                               conclusion: e.target.value
                                                           })}/>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Advise</label>
                                                    <input type="text" className="form-control" value={newReport.advise}
                                                           onChange={(e) => setNewReport({
                                                               ...newReport,
                                                               advise: e.target.value
                                                           })}/>
                                                </div>


                                            </div>
                                            {/* Prescription Section */}
                                            <div>
                                                <div className="modal-header">
                                                    <h5 className="modal-title appointment-title"
                                                        style={{fontSize: "1.4rem"}}>Prescription</h5>
                                                </div>
                                                <div className="modal-body">
                                                    {prescription?.medicines.map((med, index) => (
                                                        <div key={index} className="d-flex mb-2">
                                                            <select
                                                                className={`form-select ${!isMedicineValid[index] ? 'is-invalid' : ''}`}
                                                                value={med.medicine_id}
                                                                style={{width: "100%"}}
                                                                onChange={(e) => {
                                                                    handleMedicineChange(index, 'medicine_id', e.target.value);
                                                                    const updatedValidity = [...isMedicineValid];
                                                                    updatedValidity[index] = e.target.value !== "0"; // Update validity based on selection
                                                                    setIsMedicineValid(updatedValidity);
                                                                }}
                                                            >
                                                                <option value="">Select Medicine</option>
                                                                {medicines.map((medicine) => (
                                                                    <option key={medicine.medicine_id}
                                                                            value={medicine.medicine_id}>
                                                                        {medicine.medicine_name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <input
                                                                type="number"
                                                                className={`form-control ms-2 ${!isQuantityValid[index] ? 'is-invalid' : ''}`}
                                                                style={{width: "25%"}}
                                                                value={med.quantity}
                                                                onChange={(e) => {
                                                                    const quantityValue = Number(e.target.value);
                                                                    handleMedicineChange(index, 'quantity', quantityValue);
                                                                    const updatedValidity = [...isQuantityValid];
                                                                    updatedValidity[index] = quantityValue > 0; // Update validity based on quantity
                                                                    setIsQuantityValid(updatedValidity);
                                                                }}
                                                            />
                                                            <button className="btn btn-danger ms-2"
                                                                    onClick={() => handleRemoveMedicine(index)}>Remove
                                                            </button>
                                                        </div>
                                                    ))}

                                                    <button className="btn btn-secondary mb-2"
                                                            onClick={handleAddMedicine}>
                                                        Add Medicine
                                                    </button>
                                                    <div className="mb-3">
                                                        <label className="form-label">Instructions</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={prescription?.instruction || ''} // Use optional chaining and fallback to empty string
                                                            onChange={(e) => setPrescription(prescription ? {
                                                                ...prescription,
                                                                instruction: e.target.value
                                                            } : null)} // Only update if prescription is not null
                                                        />
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button className="btn btn-primary"
                                                                onClick={handleCreateReport}>Save
                                                            Report
                                                        </button>
                                                        <button className="btn btn-secondary"
                                                                onClick={toggleReportModal}>Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VetAppointmentDetails;
