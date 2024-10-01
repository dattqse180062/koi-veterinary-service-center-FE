import React, { useEffect, useState } from 'react';
import { fetchTransportationPrices, updateTransportationPrice } from '../api/transportApi';
import PricingManagementTable from '../components/Pricing/PricingManagementTable';
import Sidebar from "../components/layout/Sidebar";

const TransportationPricingPage: React.FC = () => {
    const [locations, setLocations] = useState<any[]>([]);
    const [updatedPrices, setUpdatedPrices] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locationData = await fetchTransportationPrices();
                setLocations(locationData);
            } catch (error) {
                alert('Failed to fetch transportation prices. Please try again later.');
            }
        };

        fetchData();
    }, []);

    const handlePriceChange = (locationId: string, price: number) => {
        if (price < 0) {
            alert('Price cannot be negative.');
            return;
        }
        setUpdatedPrices((prev) => ({ ...prev, [locationId]: price }));
    };

    const handleSubmit = async (locationId: string) => {
        if (updatedPrices[locationId] === undefined) {
            alert('Please enter a new price.');
            return;
        }

        try {
            await updateTransportationPrice(locationId, updatedPrices[locationId]);
            alert('Price updated successfully!');

            setLocations((prevLocations) =>
                prevLocations.map((location) =>
                    location.id === locationId
                        ? { ...location, price: updatedPrices[locationId] }
                        : location
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
                        }}>Transportation Pricing Management</h5>
                    </div>
                    <div className="card-body">
                        <PricingManagementTable
                            data={locations.map((location) => ({
                                id: location.id,
                                name: location.district_name,
                                price: location.price,
                            }))}
                            onPriceChange={handlePriceChange}
                            onSubmit={handleSubmit}
                            columns={['Location', 'Current Price', 'New Price', 'Actions']}
                            formatPrice={formatPrice}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransportationPricingPage;
