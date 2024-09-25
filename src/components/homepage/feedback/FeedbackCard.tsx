import React from 'react';

interface FeedbackCardProps {
    rating: number;
    text: string;
    author: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ rating, text, author }) => {
    return (
        <div className="fb-card col-lg-3 col-md-4 col-sm-6 mt-2 ">
            <div className="fb-in-card bg-white p-4" style={{ backgroundColor: '#fff' }}>
                <div className="d-flex justify-content-start mb-2">
                    {[...Array(rating)].map((_, index) => (
                        <span key={index} className="text-warning fs-4">&#9733;</span>
                    ))}
                </div>
                <p className="fb-text">{text}</p>
                <div className="d-flex justify-content-end mt-auto">
                    <strong className="text-primary me-2 mt-3">{author}</strong>
                </div>
            </div>
        </div>
    );
};

export default FeedbackCard;