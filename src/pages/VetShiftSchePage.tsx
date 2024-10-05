import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TableComponent from '../components/table/TableComponent';
import { useNavigate } from 'react-router-dom';
import { fetchVets } from '../api/vetApi';

const VetShiftSchePage: React.FC = () => {
    const [vets, setVets] = useState<any[]>([]);
    const columns = ['user_id', 'fullName', 'username', 'email', 'phone_number', 'address'];
    const columnHeaders = ['Vet ID', 'Full Name', 'Username', 'Email', 'Phone Number', 'Address'];
    const navigate = useNavigate();

    useEffect(() => {
        const getVets = async () => {
            try {
                const data = await fetchVets();
                const filteredData = data.map((vet: any) => {
                    const { password, ...rest } = vet; // Exclude password
                    return rest;
                });
                setVets(filteredData);
            } catch (error) {
                console.error('Error fetching veterinarians:', error);
            }
        };

        getVets();
    }, []);

    // Update the onClick function to have fullName as optional
    const handleVetScheduleClick = (vetId: number, fullName?: string) => {
        navigate(`/vetsche`, { state: { vetId, fullName } });
    };

    const handleVetDetailsClick = (vetId: number) => {
        navigate(`/vet-details/${vetId}`); // Example route for vet details
    };

    const actions = [
        {
            label: 'View Schedule',
            icon: 'fas fa-calendar-alt',
            onClick: handleVetScheduleClick, // This is now compatible
        },
        {
            label: 'View Details',
            icon: 'fas fa-info-circle',
            onClick: handleVetDetailsClick,
        },
    ];

    return (
        <div className="d-flex flex-grow-1">
            <Sidebar />
            <div className="container" style={{ marginTop: "6rem" }}>
                <div className="card" style={{ width: '100%' }}>
                    <div className="card-header">
                        <h5 className="text-start" style={{ fontWeight: "bold", color: "#02033B", fontSize: "2rem", padding: "1.2rem" }}>
                            Veterinarians List
                        </h5>
                    </div>
                    <div className="card-body">
                        <TableComponent
                            columns={columns}
                            columnHeaders={columnHeaders}
                            data={vets}
                            actions={actions} // Actions for Veterinarians
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VetShiftSchePage;
