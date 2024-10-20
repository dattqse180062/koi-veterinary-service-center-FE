import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TableComponent from '../components/table/TableComponent';
import { useNavigate } from 'react-router-dom';
import { fetchVets } from '../api/vetApi';
import Pagination from '@mui/material/Pagination';
interface Vet {
    user_id: number;
    fullName: string;
    username: string;
    email: string;
    phone_number: string;
    address: string;
    avatar?: string;
    // Include other fields as needed
}
const VetShiftSchePage: React.FC = () => {
    const [vets, setVets] = useState<any[]>([]);
    const columns = ['user_id', 'fullName', 'username', 'email', 'phone_number', 'address'];
    const columnHeaders = ['Vet ID', 'Full Name', 'Username', 'Email', 'Phone Number', 'Address'];
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(8); // Set the number of items per page

    useEffect(() => {
        const getVets = async () => {
            try {
                const data = await fetchVets();
                const filteredData = data.map((vet: any) => {
                    const { password, ...rest } = vet;
                    return rest;
                });
                const sortedData = filteredData.sort((a: Vet, b: Vet) => a.user_id - b.user_id);
                setVets(sortedData);
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
        navigate('/vet-details', { state: { vetId } });
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
// Calculate total pages
    const indexOfLastAddress = currentPage * itemsPerPage;
    const indexOfFirstAddress = indexOfLastAddress - itemsPerPage;
    const currentVets = vets.slice(indexOfFirstAddress, indexOfLastAddress)

    // Handle page change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    return (
        <div className="d-flex flex-grow-1">
            <Sidebar />
            <div className="container" style={{ marginTop: "6rem" }}>
                <div className="card" style={{ width: '100%' }}>
                    <div className="card-header">
                        <h5 className="text-start" style={{ fontWeight: "bold", color: "#02033B", fontSize: "2.5rem", padding: "1.2rem" }}>
                            Veterinarians List
                        </h5>
                    </div>
                    <div className="card-body">
                        <TableComponent
                            columns={columns}
                            columnHeaders={columnHeaders}
                            data={currentVets}
                            actions={actions} // Actions for Veterinarians
                            isKoiFishPage={false}
                        />
                        <Pagination
                            count={Math.ceil(vets.length / itemsPerPage)} // Total pages
                            shape="rounded"
                            page={currentPage} // Current page
                            onChange={handlePageChange} // Page change handler
                            style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} // Center the pagination
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VetShiftSchePage;
