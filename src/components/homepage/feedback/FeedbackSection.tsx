import React from 'react';
import FeedbackCard from './FeedbackCard'; // Adjust the import path as needed

const FeedbackSection: React.FC = () => {
    const feedbacks = [
        {
            rating: 5,
            text: "Highly Professional. The online consulting was a game-changer! They helped me diagnose a problem with my koi and guided me through the solution step-by-step.",
            author: "colinandmandy94"
        },
        {
            rating: 5,
            text: "Great Experience. Their team at the veterinary hospital is amazing. They treated my koi with such care, and the health check was thorough. Very pleased with the service!",
            author: "Phillip Colligan"
        },
        {
            rating: 5,
            text: "I wish they had a VPN; I’d be signing up for that too. Apart from that, the app is top-notch. The scanner and other parts of the app are really easy to use, even for a non-techie like me.",
            author: "Leslie Carrillo"
        },
        {
            rating: 5,
            text: "The customer service was exceptional. They really care about their clients and their pets!",
            author: "Jennifer Black"
        }
    ];

    return (
        <section className="feed-back py-5" style={{background: 'linear-gradient(to bottom, #F7C95F, #FDB235)'}}>
            <div className="container text-center py-3">
                <h2 className="fw-bold display-4 mb-5" style={{color: '#02033B'}}>Our Customers' Feedback</h2>
                <div className="row justify-content-center mt-4">
                    {feedbacks.map((feedback, index) => (
                        <FeedbackCard key={index} {...feedback} />
                    ))}
                </div>
                <div className="button-container mt-4"> {/* New div for centering buttons */}
                    {/* Read More Button */}
                    <button className="btn rounded-pill custom-button-feedback read-more-btn btn-shadow mb-3">
                        <span className="fw-bold">Read more</span>
                        <i className="fas fa-arrow-right ms-2"/>
                    </button>
                    {/* Request Appointment Button */}
                    <button className="btn rounded-pill custom-button-feedback btn-shadow mt-3">
                        Request Appointment <i className="fas fa-arrow-right ms-3 mt-1" style={{fontSize: "1.3rem"}}/>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeedbackSection;