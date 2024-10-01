import React from 'react';
import VetShiftTable from '../components/vet/VetShiftTable';
import Sidebar from '../components/layout/Sidebar';

const VetShiftSchePage: React.FC = () => {
    // Example data for veterinarians, including address
    const vets = [
        {
            user_id: 15,
            first_name: 'Noah',
            last_name: 'Thompson',
            username: 'vet_noah',
            email: null,
            phone_number: '0978903456',
            avatar: 'https://example.com/avatar15.jpg',
            address: '123 Main St, Cityville',
        },
        {
            user_id: 16,
            first_name: 'Emma',
            last_name: 'Johnson',
            username: 'vet_emma',
            email: null,
            phone_number: '0987654321',
            avatar: 'https://example.com/avatar16.jpg',
            address: '456 Elm St, Townsville',
        },
        {
            user_id: 17,
            first_name: 'Liam',
            last_name: 'Williams',
            username: 'vet_liam',
            email: null,
            phone_number: '0912345678',
            avatar: 'https://example.com/avatar17.jpg',
            address: '789 Oak St, Villagetown',
        },
        {
            user_id: 18,
            first_name: 'Sophia',
            last_name: 'Brown',
            username: 'vet_sophia',
            email: null,
            phone_number: '0934567890',
            avatar: 'https://example.com/avatar18.jpg',
            address: '321 Pine St, Metropolis',
        },
        {
            user_id: 19,
            first_name: 'Jackson',
            last_name: 'Jones',
            username: 'vet_jackson',
            email: null,
            phone_number: '0945678901',
            avatar: 'https://example.com/avatar19.jpg',
            address: '654 Maple St, Capital City',
        },
        {
            user_id: 20,
            first_name: 'Ava',
            last_name: 'Garcia',
            username: 'vet_ava',
            email: null,
            phone_number: '0956789012',
            avatar: 'https://example.com/avatar20.jpg',
            address: '987 Birch St, Springfield',
        },
    ];

    return (
        <div className="d-flex flex-grow-1">
            <Sidebar />
            <div className="container " style={{marginTop:"6rem"}}>
                <div className="card" style={{ width: '100%' }}>
                    <div className="card-header">
                        <h5 className="text-start"  style={{fontWeight:"bold", color:"#02033B", fontSize:"2rem", padding:"1.2rem"}}>Veterinarians List</h5>

                    </div>
                    <div className="card-body">
                        <VetShiftTable vets={vets} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VetShiftSchePage;
