import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TableComponent from '../components/table/TableComponent';

const KoiFishPage: React.FC = () => {
    const [koiFishData, setKoiFishData] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
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

    return (
        <div className="d-flex flex-grow-1">
            <Sidebar />
            <div className="container" style={{ marginTop: "6rem" }}>
                <div className="card" style={{ width: '100%' }}>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="text-start" style={{ fontWeight: "bold", color: "#02033B", fontSize: "2rem", padding: "1.2rem" }}>
                            Koi Fish List
                        </h5>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/add-koifish?id=${sessionStorage.getItem('userId')}`)}
                        >
                            Add Koi Fish
                        </button>
                    </div>
                    <div className="card-body">
                        <TableComponent
                            columns={['fish_id', 'species', 'age', 'gender', 'color', 'size']}
                            columnHeaders={['Fish ID', 'Species', 'Age', 'Gender', 'Color', 'Size (cm)']}
                            data={koiFishData}
                            actions={[{ label: 'View Details', icon: 'fas fa-eye', onClick: handleKoiFishClick }]} // Action for Koi Fish
                            isKoiFishPage={true} // Thêm prop này
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KoiFishPage;
