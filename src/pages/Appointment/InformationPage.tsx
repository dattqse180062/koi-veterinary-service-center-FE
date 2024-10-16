import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/Profile.css';
import { useAuth } from "../../hooks/context/AuthContext";
import { fetchAddresses } from "../../api/addressApi";
import { fetchFishes } from "../../api/koiApi";
import { getUserInfo } from "../../api/authService";
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setForm } from '../../store/actions';


const FillInformationPage: React.FC = () => {
    const { user } = useAuth(); // Use Auth context to get userId
    const userId = user?.userId;
    const navigate = useNavigate();
    const [fishes, setFishes] = useState<any[]>([]);
    const [addresses, setAddresses] = useState<any[]>([]);

    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [selectedFish, setSelectedFish] = useState<string>("");
    const service = useSelector((state: any) => state.service);
    const dispatch = useDispatch();

    const [error, setError] = useState<string | null>(null);
    const [errorPhone, setErrorPhone] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [errorName, setErrorName] = useState<string>('');

    const [formData, setFormData] = useState({
        customer_name: '',
        phone: '',
        email: '',
        address: '',
        fish: '',
        description: '',
        payment_method: 'VN_PAY', // Default to online payment if service_id is 1
        address_id: null as number | null,
        fish_id: null as number | null,
        district: '',
    });

    // Validation states
    const [validity, setValidity] = useState({
        name: true,
        phone: true,
        email: true,
        address: true,
        fish: true,
    });

    const slotDate = useSelector((state: any) => state.slot);

    useEffect(() => {
        // If service is null, navigate to service selection
        if (!service) {
            alert("You need to choose a service first!");
            navigate('/appointment/service-selection');
        }
        // If service is present but slotDate is null, navigate to slot date selection
        else if (!slotDate) {
            alert("You should choose a slot first!");
            navigate('/appointment/slot-date-selection');
        }
    }, [service, slotDate, navigate]);
    const service_id = service?.service_id;

    useEffect(() => {
        const getUserProfile = async () => {
            if (userId) {
                try {
                    const userData = await getUserInfo(userId); // Fetch user profile
                    setFormData((prevData) => ({
                        ...prevData,
                        customer_name: `${userData.first_name} ${userData.last_name}`, // Combine first and last name
                        phone: userData.phone_number, // Use the user's phone number
                        email: userData.email, // Use the user's email
                    }));
                } catch (err) {
                    setError('Failed to fetch user profile');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('User ID is not available');
                setLoading(false);
            }
        };

        getUserProfile();
    }, [userId]);

    useEffect(() => {
        const getAddresses = async () => {
            if (userId) {
                try {
                    const data = await fetchAddresses(userId); // Gọi API để lấy danh sách địa chỉ
                    setAddresses(data); // Cập nhật state với dữ liệu địa chỉ
                } catch (err) {
                    setError('Failed to fetch addresses');
                } finally {
                    setLoading(false); // Tắt trạng thái loading sau khi dữ liệu đã được load
                }
            } else {
                setError('User ID is not available');
                setLoading(false);
            }
        };

        getAddresses();
    }, [userId]);

    useEffect(() => {
        const getFishes = async () => {
            if (userId) {
                try {
                    const data = await fetchFishes(userId);
                    setFishes(data);
                } catch (err) {
                    setError('Failed to fetch fishes');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('User ID is not available');
                setLoading(false);
            }
        };

        getFishes();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const address = addresses.find(address => `${address.home_number}/ ${address.district}/ ${address.ward}/ ${address.city}` === selectedValue);
        const addressId = address?.address_id || 0;
        setSelectedAddress(selectedValue);
        setFormData({ ...formData, address: selectedValue, district: address?.district || '', address_id: addressId });
    };

    const handleFishChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const fishId = fishes.find(fish => `${fish.species}/ ${fish.origin}/ ${fish.color} (${fish.gender})` === selectedValue)?.fish_id || 0;
        setSelectedFish(selectedValue);
        setFormData({ ...formData, fish: selectedValue, fish_id: fishId });
    };

    const validateFields = () => {
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isAddressValid =  (selectedAddress.trim() !== '' || service_id === 1);
        const isFishValid = (service_id === 1 || service_id === 2 || selectedFish.trim() !== '');

        setValidity({
            name: isNameValid,
            phone: isPhoneValid,
            email: isEmailValid,
            address: isAddressValid,
            fish: isFishValid,
        });
        console.log('Validation Results:', { isNameValid, isPhoneValid, isEmailValid, isAddressValid, isFishValid });
        return isNameValid && isPhoneValid && isEmailValid && isAddressValid && isFishValid;
    };
    // Handle validation for Name
    const validateName = () => {
        if (formData.customer_name.trim() === '') {
            setErrorName('Name is required.'); // Set error message for name
            return false;
        } else {
            setErrorName(''); // Clear error if name is valid
            return true;
        }
    };

    // Handle validation for phone number
    const validatePhone = () => {
        const phonePattern = /^[0-9]{10}$/;
        if (formData.phone.trim() === '') {
            setErrorPhone('Phone number is required.'); // Error when phone is empty
            return false;
        } else if (!phonePattern.test(formData.phone)) {
            setErrorPhone('Contact number must be a 10-digit number.'); // Error for invalid phone format
            return false;
        } else {
            setErrorPhone(''); // Clear error if phone is valid
            return true;
        }
    };

    // Handle validation for email
    const validateEmail = () => {
        // Regex to ensure email contains "@" and at least one "." after the "@"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if the email matches the regex and does not include spaces
        if (!emailRegex.test(formData.email) || formData.email.includes(' ')) {
            setErrorEmail('Please enter a valid email.');
            return false;
        }

        setErrorEmail(''); // Clear error if email is valid
        return true;
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateFields()) {
            return; // Don't proceed with submission if any fields are invalid
        }


        console.log(formData);


        try {
            dispatch(setForm(formData));
            navigate('/appointment/order-confirm'); // Redirect to the order page using navigate
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    const handleBackClick = () => {
        navigate('/appointment/slot-date-selection'); // Navigate back to service selection page
    };
    return (
        <div className="container profile-page d-flex flex-grow-1 align-items-center justify-content-center">
            <div className="form-section w-100" style={{width: "100%", maxWidth: 900}}>
                <button
                    className="btn btn-secondary mb-3"
                    style={{position: 'absolute', top: '12%', left: '3%'}}
                    onClick={handleBackClick}>
                    Back
                </button>
                <form onSubmit={handleNext} className="profile-form ">
                    <div className="row">
                        <div>
                            <h5 className="mb-3" style={{fontWeight: "bold", color: "#02033B", fontSize: "2.7rem"}}>
                                Fill Information
                            </h5>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="fw-bold form-label">Your Name</label>
                                <input
                                    type="text"
                                    className={`form-control input-field ${!validity.name ? 'border-danger' : ''}`}
                                    name="customer_name"
                                    placeholder="Enter your name"
                                    value={formData.customer_name}
                                    onChange={handleChange}
                                />
                                {errorName && <small className="text-danger">{errorName}</small>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="fw-bold form-label">Phone</label>
                                <input
                                    type="text"
                                    className={`form-control input-field ${!validity.phone ? 'border-danger' : ''}`}
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                {errorPhone && <small className="text-danger">{errorPhone}</small>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="fw-bold form-label">Email</label>
                                <input
                                    type="email"
                                    className={`form-control input-field ${!validity.email ? 'border-danger' : ''}`}
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errorEmail && <small className="text-danger">{errorEmail}</small>}
                            </div>
                            {service_id !== 1 && service_id !== 2 && (
                                <div className="form-group mb-3 position-relative">
                                    <label className="fw-bold form-label">Fish</label>
                                    <div className="position-relative">
                                        <select
                                            className={`form-control input-field ${!validity.fish ? 'border-danger' : ''}`}
                                            id="fish"
                                            name="fish"
                                            value={selectedFish}
                                            onChange={handleFishChange}
                                        >
                                            <option value="">Select a fish</option>
                                            {fishes.map((fish, index) => (
                                                <option key={fish.fish_id || index}
                                                        value={`${fish.species}/ ${fish.origin}/ ${fish.color} (${fish.gender})`}>
                                                    {fish.species} ({fish.origin}) - Color: {fish.color}
                                                </option>
                                            ))}
                                        </select>
                                        <i className="bi bi-chevron-down dropdown-icon"></i>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-md-6">
                            {(service_id !== 1) && (
                                <div className="form-group mb-3 position-relative">
                                    <label className="fw-bold form-label">Address</label>
                                    <div className="position-relative">
                                        <select
                                            className={`form-control input-field ${!validity.address ? 'border-danger' : ''}`}
                                            id="address"
                                            name="address"
                                            value={selectedAddress}
                                            onChange={handleAddressChange}
                                        >
                                            <option value="">Select an address</option>
                                            {addresses.map((address, index) => (
                                                <option key={address.address_id || index}
                                                        value={`${address.home_number}/ ${address.district}/ ${address.ward}/ ${address.city}`}>
                                                    {address.home_number}/ {address.district}/ {address.ward}/ {address.city}
                                                </option>
                                            ))}
                                        </select>
                                        <i className="bi bi-chevron-down dropdown-icon"></i>
                                    </div>
                                </div>
                            )}

                            <div className="form-group mb-3">
                                <label className="fw-bold form-label">Description</label>
                                <textarea
                                    className="form-control input-field"
                                    name="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                            </div>

                            <div className=" form-group mb-3">
                                <label className="fw-bold form-label">Payment Method</label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="payment_method"
                                        value="VN_PAY"
                                        checked={formData.payment_method === 'VN_PAY'}
                                        onChange={handleChange}

                                    />
                                    <label className="form-check-label">Pay Online</label>
                                </div>

                                {/* Show cash payment option only if service_id is not 1 */}
                                {service_id !== 1 && (
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="payment_method"
                                            value="CASH"
                                            checked={formData.payment_method === 'CASH'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">Pay with Cash</label>
                                    </div>
                                )}
                            </div>


                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary">
                                    Next
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
        ;
};

export default FillInformationPage;
