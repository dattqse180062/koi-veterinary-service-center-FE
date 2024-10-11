import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Rating } from '@mui/material';
import {setDoctor} from "../../store/actions";
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";

interface Doctor {
    user_id: number;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface Feedback {
    rating: number; // Assume you have a rating field in feedback
}

const ChooseVeterinarianPage: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [ratings, setRatings] = useState<{ [key: number]: number }>({});
    const cardContainerRef = useRef<HTMLDivElement | null>(null); // Reference for the card container
    const dispatch = useDispatch(); // Initialize useDispatch
    const navigate = useNavigate();
    // Function to fetch doctors from the API
    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/users/veterinarians');
            console.log('Fetched doctors:', response.data);
            setDoctors(response.data); // Assume the API response is an array of doctors

            // Fetch feedback for each doctor
            response.data.forEach(async (doctor: Doctor) => {
                const feedbackResponse = await axios.get(`http://localhost:8080/api/v1/users/veterinarian/${doctor.user_id}/feedbacks`);
                const feedbacks: Feedback[] = feedbackResponse.data;

                // Calculate average rating
                if (feedbacks.length > 0) {
                    const averageRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length;
                    setRatings((prev) => ({ ...prev, [doctor.user_id]: averageRating }));
                } else {
                    setRatings((prev) => ({ ...prev, [doctor.user_id]: 0 })); // If no feedback
                }
            });
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    useEffect(() => {
        fetchDoctors(); // Fetch the data when the component mounts
    }, []);

    // Function to scroll left
    const scrollLeft = () => {
        if (cardContainerRef.current) {
            cardContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' }); // Adjust the value as needed
        }
    };

    // Function to scroll right
    const scrollRight = () => {
        if (cardContainerRef.current) {
            cardContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' }); // Adjust the value as needed
        }
    };

    const handleCardClick = (doctor: Doctor) => {
        const doctorData = {
            user_id: doctor.user_id,
            first_name: doctor.first_name,
            last_name: doctor.last_name,
            image: doctor.avatar,

        };
        dispatch(setDoctor(doctorData)); // Dispatch action to set service_id
        console.log('Selected user_id:', doctor);
        // Navigate to FishSelectionPage
        navigate('/appointment/slot-selection'); // Replace with react-router navigate if needed
    };

    const handleSkipClick = () => {
        dispatch(setDoctor(null)); // Dispatch null for user_id

        // Navigate to FishSelectionPage or any other page you want
        navigate('/appointment/slot-selection');

    };

    const handleBackClick = () => {
        navigate('/appointment/service-selection'); // Navigate back to service selection page
    };

    return (
        <div
            className="veterinarian-section bg-light d-flex justify-content-center align-items-center"
            style={{minHeight: '80vh', marginTop: '75px'}} // Center the section vertically
        >

            <div className="container-fluid">
                <div className="position-absolute" style={{top: '10%', left: '5%x'}}>
                    <button className="btn btn-secondary" onClick={handleBackClick}>
                        Back
                    </button>
                </div>
                {/* Main content */}
                <div className="text-center my-4">
                    <h1 className="display-4 fw-bold" style={{color: '#02033B'}}>Choose Veterinarian</h1>
                </div>




                {/* Doctors Grid */}
                <div
                    className="d-flex " // Enable horizontal scrolling
                    ref={cardContainerRef} // Attach ref to the container
                    style={{
                        padding: '20px',
                        flexWrap: 'nowrap',
                        overflow: 'hidden',// Prevent wrapping to a new line
                    }}
                >
                    {doctors.map((doctor) => (
                        <div
                            key={doctor.user_id}
                            className="d-flex flex-column align-items-center" // Center cards vertically
                            style={{
                                flex: '0 0 200px', // Prevent shrinking
                                margin: '0 10px', // Add margin for spacing between cards
                            }}
                        >
                            <div className="card shadow vet-card"
                                 style={{borderRadius: '40px', width: '300px', height: '330px'}}
                                 onClick={() => handleCardClick(doctor)}>
                                <img
                                    src={doctor.avatar}
                                    className="card-img-top rounded-circle mx-auto mt-4"
                                    alt={`${doctor.first_name} ${doctor.last_name}`}
                                    style={{width: '200px', height: '200px'}}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title text-center font-weight-bold"
                                        style={{marginLeft: "25px"}}>{`${doctor.first_name} ${doctor.last_name}`}</h5>
                                    <Rating
                                        name={`rating-${doctor.user_id}`} // Unique name for each doctor
                                        value={ratings[doctor.user_id] || 0} // Average rating
                                        readOnly // Read-only mode
                                        precision={0.5} // Precision for rating
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Navigation buttons */}
                <div className="d-flex justify-content-between" style={{margin:"0px 20px"}}>
                    <button className="prev-next-button d-flex align-items-center fw-bold" onClick={scrollLeft}>
                        <i className="fa-solid fa-circle-chevron-left " style={{marginRight: '8px'}}></i>
                        Prev
                    </button>
                    <button className="prev-next-button d-flex align-items-center fw-bold" onClick={scrollRight}>
                        Next
                        <i className="fa-solid fa-circle-chevron-right" style={{marginLeft: '8px'}}></i>
                    </button>
                </div>
                {/* Skip button */}
                <div className="text-right mt-2">
                    <button className="btn btn-warning px-4 py-2 rounded-pill fw-bold" onClick={handleSkipClick}>
                        Skip
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChooseVeterinarianPage;
