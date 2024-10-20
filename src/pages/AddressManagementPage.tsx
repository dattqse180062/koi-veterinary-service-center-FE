import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TableComponent from '../components/table/TableComponent';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../hooks/context/AuthContext";
import axios from "axios";
import {fetchAddresses} from "../api/addressApi";
import Pagination from '@mui/material/Pagination';
// interface Address {
//     address_id:number
//     district: string;
//     city: string;
//     ward: string;
//     home_number: string;
//
// }
const AddressManagementPage: React.FC = () => {
    const [addresses, setAddresses] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(8); // Set the number of items per page
    const columns = ['address_id', 'district', 'city', 'ward', 'home_number'];
    const columnHeaders = ['Id', 'District', 'City', 'Ward', 'Home Number'];
    const navigate = useNavigate();
    const { user  } = useAuth(); // Use Auth context to get userId
    const userId = user?.userId;
    useEffect(() => {
        const getAddresses = async () => {
            if (userId) {  // Kiểm tra nếu userId không undefined
                try {
                    const data = await fetchAddresses(); // Gọi API để lấy danh sách địa chỉ
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

    // Update the onClick function to have fullName as optional


    const handleAddressDetailsClick = (addressId: number) => {

        navigate('/address-details', { state: { addressId } });
    };

    const actions = [

        {
            label: 'View Details',
            icon: 'fas fa-info-circle',
            onClick: handleAddressDetailsClick,
        },
    ];
// Calculate total pages
    const indexOfLastAddress = currentPage * itemsPerPage;
    const indexOfFirstAddress = indexOfLastAddress - itemsPerPage;
    const currentAddresses = addresses.slice(indexOfFirstAddress, indexOfLastAddress)

    // Handle page change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    return (
        <div className="d-flex flex-grow-1">
            <Sidebar />
            <div className="container" style={{ marginTop: "6rem" }}>
                <div className="card" style={{ width: '100%' }}>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="text-start"
                            style={{fontWeight: "bold", color: "#02033B", fontSize: "2.5rem", padding: "1.2rem"}}>
                            Addresses List
                        </h5>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/add-address`)}
                        >
                            Add Address
                        </button>
                    </div>
                    <div className="card-body">
                        <TableComponent
                            columns={columns}
                            columnHeaders={columnHeaders}
                            data={currentAddresses}
                            actions={actions} // Actions for Veterinarians
                            isKoiFishPage={false}
                            isAddressPage={true}
                        />
                        <Pagination
                            count={Math.ceil(addresses.length / itemsPerPage)} // Total pages
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

export default AddressManagementPage;
