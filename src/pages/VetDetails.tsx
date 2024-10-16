import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { useLocation } from "react-router-dom";
import {getUserProfile, updateUserProfile, updateUserAddress, getCertificates, uploadCertificate} from "../api/vetApi"; // Import the API functions
import '../styles/Profile.css'; // Create a new CSS file for specific styles

// Define interfaces for veterinarian data
interface VetAddress {
    district: string;
    city: string;
    ward: string;
    home_number: string;
}

interface VetData {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: VetAddress;
    image?: string; // Optional field for the veterinarian's image
}

interface Certificate {
    certificate_id: number;
    certificate_name: string;
    file_path: string; // Assuming the response contains this field
}


const VetDetails: React.FC = () => {
    const location = useLocation();
    const { vetId } = location.state; // Get veterinarian ID passed via state
    const [vetData, setVetData] = useState<VetData | null>(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [ward, setWard] = useState("");
    const [homeNumber, setHomeNumber] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorAddress, setErrorAddress] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [email, setEmail] = useState("");

    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [certificateName, setCertificateName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showCertificateDiv, setShowCertificateDiv] = useState(false);
    // Fetch veterinarian data from API on component mount
    useEffect(() => {
        const fetchVetData = async () => {
            try {
                const vet = await getUserProfile(vetId); // Call API to get vet details
                setVetData(vet);
                setFirstname(vet.first_name || '');
                setLastname(vet.last_name || '');
                setPhone(vet.phone_number || '');
                setDistrict(vet.address?.district || '');
                setCity(vet.address?.city || '');
                setWard(vet.address?.ward || '');
                setHomeNumber(vet.address?.home_number || '');
                setSelectedImage(vet.image || null);
            } catch (error) {
                console.error('Failed to fetch veterinarian data:', error);
            }
        };

        fetchVetData();
    }, [vetId]);

    // Fetch certificates from the API
    const fetchCertificates = async () => {
        try {
            const certs = await getCertificates(vetId);
            setCertificates(certs);
        } catch (error) {
            console.error('Failed to fetch certificates:', error);
        }
    };

    // Handle file selection for certificate upload
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    // Handle uploading a certificate
    const handleUploadCertificate = async () => {
        if (!selectedFile || !certificateName) {
            alert("Please enter a certificate name and select a file.");
            return;
        }

        try {
            await uploadCertificate(vetId, certificateName, selectedFile);
            alert('Certificate uploaded successfully!');
            setCertificateName(""); // Clear the input
            setSelectedFile(null); // Clear file selection
            await fetchCertificates(); // Refresh the list of certificates
        } catch (error) {
            console.error('Failed to upload certificate:', error);
        }
    };


    // Handle image upload
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Validate phone number
    const validatePhone = () => {
        const phonePattern = /^[0-9]{10}$/;
        if (phone.trim() !== "" && !phonePattern.test(phone)) {
            setErrorPhone("Contact number must be a 10-digit number.");
        } else {
            setErrorPhone("");
        }
    };

    // Validate address fields
    const validateAddress = () => {
        const addressFieldsFilled = [district, city, ward, homeNumber].some(field => field.trim() !== "");
        const allAddressFieldsFilled = [district, city, ward, homeNumber].every(field => field.trim() !== "");

        if (addressFieldsFilled && !allAddressFieldsFilled) {
            setErrorAddress("Please fill all address fields if you enter one.");
            return false;
        } else {
            setErrorAddress("");
            return true;
        }
    };

    // Handle saving updated veterinarian profile and address info
    const handleSave = async () => {
        validatePhone();
        const isAddressValid = validateAddress();

        if (errorPhone || !isAddressValid) return;

        try {
            const updatedProfileData = {
                firstname,
                lastname,
                phone,
                email,
                image: selectedImage,
            };

            await updateUserProfile(vetId, updatedProfileData);


            const addressData = { district, city, ward, homeNumber };
            const anyAddressFieldFilled = [district, city, ward, homeNumber].some(field => field.trim() !== "");

            if (anyAddressFieldFilled) {
                await updateUserAddress(vetId, addressData); // Call the update address API
            }

            alert('Veterinarian profile updated successfully!');
        } catch (error) {
            console.error('Failed to update veterinarian data:', error);
        }
    };

    // Handle cancel action to reset form values to original state
    const handleCancel = () => {
        if (vetData) {
            setFirstname(vetData.first_name || '');
            setLastname(vetData.last_name || '');
            setPhone(vetData.phone_number || '');
            setDistrict(vetData.address?.district || '');
            setCity(vetData.address?.city || '');
            setWard(vetData.address?.ward || '');
            setHomeNumber(vetData.address?.home_number || '');
            setSelectedImage(vetData.image || null);
        }
    };
    // Show/hide certificate input div

    const toggleCertificateDiv = () => {
        setShowCertificateDiv(!showCertificateDiv);
        if (!showCertificateDiv) {
            fetchCertificates(); // Fetch certificates when opening the modal
        }
    };

    return (
        <div className="d-flex profile-page">
            <Sidebar />
            <div className="flex-grow-1 bg-light" style={{ height: '100vh' }}>
                <div className="profile-container">

                    <div className="image-section">
                        <div className="image-background">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Uploaded" className="uploaded-image"/>
                            ) : (
                                <div className="image-placeholder">No Image Selected</div>
                            )}
                        </div>
                        <label className="upload-btn">
                            {selectedImage ? "Change Image" : "Choose Image"}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{display: 'none'}}
                            />
                        </label>
                        <button className="btn btn-success" onClick={toggleCertificateDiv}>
                            Certificate
                        </button>
                    </div>

                    <div className="form-section">
                        <form className="profile-form">
                            <div className="form-group">
                                <label className="fw-bold">Username</label>
                                <input type="text" className="form-control input-field"
                                       value={vetData?.username || 'Loading...'} readOnly/>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Email</label>
                                <input
                                    type="email"
                                    className="form-control input-field"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} // Update email state
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="name-row">
                                <div className="form-group">
                                    <label className="fw-bold">First Name</label>
                                    <input type="text" className="form-control input-field" value={firstname}
                                           onChange={e => setFirstname(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">Last Name</label>
                                    <input type="text" className="form-control input-field" value={lastname}
                                           onChange={e => setLastname(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Contact Number</label>
                                <input type="text" className="form-control input-field" value={phone}
                                       onChange={e => setPhone(e.target.value)} onBlur={validatePhone}/>
                                {errorPhone && <div className="error-register">{errorPhone}</div>}
                            </div>

                            <div className="address-row">
                                <div className="form-group">
                                    <label className="fw-bold">District</label>
                                    <input type="text" className="form-control input-field" value={district}
                                           onChange={e => setDistrict(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">City</label>
                                    <input type="text" className="form-control input-field" value={city}
                                           onChange={e => setCity(e.target.value)}/>
                                </div>
                            </div>
                            <div className="address-row">
                                <div className="form-group">
                                    <label className="fw-bold">Ward</label>
                                    <input type="text" className="form-control input-field" value={ward}
                                           onChange={e => setWard(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-bold">Home Number</label>
                                    <input type="text" className="form-control input-field" value={homeNumber}
                                           onChange={e => setHomeNumber(e.target.value)}/>
                                </div>
                            </div>
                            {errorAddress && <div className="error-register">{errorAddress}</div>}
                            <div className="button-group">
                                <div className="right-buttons">
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>

                                </div>
                            </div>

                        </form>
                    </div>
                    {/* Certificate Button */}


                    {/* Certificate Modal */}
                    {showCertificateDiv && (
                        <div className="certificate-modal">
                            <div className="modal-backdrop" onClick={toggleCertificateDiv}></div>
                            <div className="modal-content">
                                <h2>Add Certificate</h2>
                                <form>
                                    <div className="form-group">
                                        <label>Certificate Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={certificateName}
                                            onChange={(e) => setCertificateName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Upload File</label>
                                        <input type="file" accept="application/pdf" onChange={handleFileChange} />
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={handleUploadCertificate}>
                                        Upload
                                    </button>
                                </form>
                                <h3>Existing Certificates:</h3>
                                <ul className="certificate-list">
                                    {certificates.map(cert => (
                                        <li key={cert.certificate_id}>
                                            <a href={cert.file_path} target="_blank" rel="noopener noreferrer">{cert.certificate_name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VetDetails;
