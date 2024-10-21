import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TableComponent from '../components/table/TableComponent';
import { useNavigate } from 'react-router-dom';
import { fetchCustomers } from '../api/customerApi';

interface Customer {
    // avatar: string;
    user_id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone_number: string;
    address: string;
    // Include other fields as needed
}
const CustomerManagementPage: React.FC = () => {
    const [vets, setVets] = useState<any[]>([]);
    const columns = ['user_id', 'fullName', 'username', 'email', 'phone_number', 'address'];
    const columnHeaders = ['Customer ID', 'Full Name', 'Username', 'Email', 'Phone Number', 'Address'];
    const navigate = useNavigate();

    useEffect(() => {
        const getVets = async () => {
            try {
                const data = await fetchCustomers();
                const filteredData = data.map((vet: any) => {
                    const { password, ...rest } = vet; // Exclude password
                    return rest;
                });
                const sortedData = filteredData.sort((a: Customer, b: Customer) => a.user_id - b.user_id);
                setVets(sortedData);
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };

        getVets();
    }, []);

    // Update the onClick function to have fullName as optional
    const handleVetScheduleClick = (userID: number, fullName?: string) => {
        navigate(`/vetsche`, { state: { userID, fullName } });
    };

    const handleCustomerDetails = (userID: number) => {
        navigate('/customer-details', { state: { userID } });
    };

    const actions = [
        // {
        //     label: 'View Schedule',
        //     icon: 'fas fa-calendar-alt',
        //     onClick: handleVetScheduleClick, // This is now compatible
        // },
        {
            label: 'View Details',
            icon: 'fas fa-info-circle',
            onClick: handleCustomerDetails,
        },
    ];

    return (
        <div className="d-flex flex-grow-1">
            <Sidebar />
            <div className="container" style={{ marginTop: "6rem" }}>
                <div className="card" style={{ width: '100%' }}>
                    <div className="card-header">
                        <h5 className="text-start" style={{ fontWeight: "bold", color: "#02033B", fontSize: "2rem", padding: "1.2rem" }}>
                            Customer list
                        </h5>
                    </div>
                    <div className="card-body">
                        <TableComponent
                            columns={columns}
                            columnHeaders={columnHeaders}
                            data={vets}
                            actions={actions} // Actions for manager : manage customer
                            isKoiFishPage={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerManagementPage;
