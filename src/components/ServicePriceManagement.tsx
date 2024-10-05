import React, { useEffect, useState } from 'react';
import { fetchServices, updateServicePrice } from '../api/serviceApi'; // Import the API functions
import '../styles/ServicePricing.css';
import Sidebar from "./layout/Sidebar";

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

            // Fetch updated service data
            const updatedServices = await fetchServices();
            setServices(updatedServices); // Update the state with new services data
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
                            fontSize: "2rem",
                            padding: "1.2rem"
                        }}>Service Pricing Management</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-small table-striped">
                                <thead className="table-light">
                                <tr>
                                    <th>Service Name</th>
                                    <th>Description</th>
                                    <th>Current Price</th>
                                    <th>New Price</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {services.map((service) => (
                                    <tr key={service.id}>
                                        <td>{service.service_name}</td>
                                        <td>{service.description}</td>
                                        <td className="fw-bold fst-italic">{formatPrice(service.service_price)}</td>
                                        <td>
                                            <input
                                                type="number"
                                                onChange={(e) => handlePriceChange(service.id, Number(e.target.value))}
                                                style={{ width: "7rem" }}
                                            />
                                        </td>
                                        <td>
                                            <button className="btn btn-primary btn-sm"
                                                    onClick={() => handleSubmit(service.id)}>Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePricingPage;
