import React from 'react';
import "../../styles/ServicePricing.css"

interface PricingManagementTableProps {
    data: {
        id: string;
        name: string;
        price: number;
    }[];
    onPriceChange: (locationId: string, price: number) => void;
    onSubmit: (locationId: string) => void;
    columns: string[];
    formatPrice: (price: number) => string;
}

const PricingManagementTable: React.FC<PricingManagementTableProps> = ({
                                                                           data,
                                                                           onPriceChange,
                                                                           onSubmit,
                                                                           columns,
                                                                           formatPrice,
                                                                       }) => {
    return (
        <div className="table-responsive">

            <table className="table-bordered table-small-pricing table-striped">

                <thead className="table-light">
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((location) => (
                    <tr key={location.id}>
                        <td>{location.name}</td>
                        <td className="fw-bold fst-italic">{formatPrice(location.price)}</td>
                        <td>
                            <input
                                type="number"
                                onChange={(e) => onPriceChange(location.id, Number(e.target.value))}
                                style={{ width: "7rem" }}
                            />
                        </td>
                        <td>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => onSubmit(location.id)}
                            >
                                Update
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PricingManagementTable;
