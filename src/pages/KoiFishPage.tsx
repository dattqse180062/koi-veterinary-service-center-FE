import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TableComponent from '../components/table/TableComponent';
import { useAuth } from "../hooks/context/AuthContext";
import Pagination from '@mui/material/Pagination';
const KoiFishPage: React.FC = () => {
    const [koiFishData, setKoiFishData] = useState<any[]>([]);
    const navigate = useNavigate();
    const { user  } = useAuth(); // Use Auth context to get userId
    const userId = user?.userId; // Access userId safely
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(8); // Set the number of items per page

    useEffect(() => {

        if (!userId) {
            alert("Bạn chưa đăng nhập! Vui lòng đăng nhập!!!");
            navigate('/login');
            return;
        }

        axios.get('https://66fa1da4afc569e13a9a726b.mockapi.io/api/koi')
            .then(response => {
                const filteredData = response.data.filter((fish: { user_id: number }) => fish.user_id === Number(userId));
                setKoiFishData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching Koi Fish data:', error);
            });
    }, [navigate]);

    const handleKoiFishClick = (fishId: number) => {
        console.log("Clicked fish ID:", fishId); // Thêm dòng này để kiểm tra
        navigate(`/koi-details`, { state: { fishId } }); // Truyền fishId vào state
    };
// Calculate total pages
    const indexOfLastAddress = currentPage * itemsPerPage;
    const indexOfFirstAddress = indexOfLastAddress - itemsPerPage;
    const currentKoi = koiFishData.slice(indexOfFirstAddress, indexOfLastAddress)

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
                        <h5 className="text-start" style={{ fontWeight: "bold", color: "#02033B", fontSize: "2.5rem", padding: "1.2rem" }}>
                            Koi Fish List
                        </h5>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/add-koifish?id=${userId}`)}
                        >
                            Add Koi Fish
                        </button>
                    </div>
                    <div className="card-body">
                        <TableComponent
                            columns={['fish_id', 'species', 'age', 'gender', 'color', 'size']}
                            columnHeaders={['Fish ID', 'Species', 'Age', 'Gender', 'Color', 'Size (cm)']}
                            data={currentKoi}
                            actions={[{ label: 'View Details', icon: 'fas fa-info-circle', onClick: handleKoiFishClick }]} // Action for Koi Fish
                            isKoiFishPage={true} // Thêm prop này
                        />
                        <Pagination
                            count={Math.ceil(koiFishData.length / itemsPerPage)} // Total pages
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

export default KoiFishPage;
