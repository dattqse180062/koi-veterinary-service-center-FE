import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AvailableSlots from "./AvailableSlotsPage";
import SlotDateSelection from "../../components/schedule/SlotDateSelection";

const SlotDateSelectionPage: React.FC = () => {
    const doctor = useSelector((state: any) => state.doctor);
    const service = useSelector((state: any) => state.service);
    const navigate = useNavigate();
    useEffect(() => {
        // Nếu service là null, điều hướng về trang chọn service
        if (!service) {
            alert("You should choose service first!!!")
            navigate('/appointment/service-selection');

        }
    }, [service, navigate]);
    return (


                <AvailableSlots />





    );
};

export default SlotDateSelectionPage;
