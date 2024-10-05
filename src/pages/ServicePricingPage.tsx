
import React, { useEffect, useState } from 'react';
import { fetchServices, updateServicePrice } from '../api/serviceApi';
import PricingManagementTable from '../components/Pricing/PricingManagementTable';
import Sidebar from "../components/layout/Sidebar";

const ServicePricingPage: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [updatedPrices, setUpdatedPrices] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesData = await fetchServices();
                setServices(servicesData);
            } catch (error) {
                alert('Failed to fetch services. Please try again later.');
            }
        };

        fetchData();
    }, []);

    const handlePriceChange = (serviceId: string, price: number) => {
        if (price < 0) {
            alert('Price cannot be negative.');
            return;
        }
        setUpdatedPrices((prev) => ({ ...prev, [serviceId]: price }));
    };

    const handleSubmit = async (serviceId: string) => {
        if (updatedPrices[serviceId] === undefined) {
            alert('Please enter a new price.');
            return;
        }

        try {
            await updateServicePrice(serviceId, updatedPrices[serviceId]);
            alert('Price updated successfully!');

            setServices((prevServices) =>
                prevServices.map((service) =>
                    service.id === serviceId
                        ? { ...service, service_price: updatedPrices[serviceId] }
                        : service
                )
            );
        } catch (error) {
            alert('Failed to update price. Please try again later.');
        }
    };

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    };

    return (
        <div className="d-flex flex-grow-1">
            <Sidebar />
            <div className="container" style={{ marginTop: "6rem" }}>
                <div className="card" style={{ width: '100%' }}>
                    <div className="card-header">
                        <h5 className="text-start" style={{
                            fontWeight: "bold",
                            color: "#02033B",
                            fontSize: "2.6rem",
                            padding: "1.2rem"
                        }}>Service Pricing Management</h5>
                    </div>
                    <div className="card-body">
                        <PricingManagementTable
                            data={services.map((service) => ({
                                id: service.id,
                                name: service.service_name,
                                price: service.service_price,
                            }))}
                            onPriceChange={handlePriceChange}
                            onSubmit={handleSubmit}
                            columns={['Service Name', 'Current Price', 'New Price', 'Actions']}
                            formatPrice={formatPrice}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};


export default ServicePricingPage;

