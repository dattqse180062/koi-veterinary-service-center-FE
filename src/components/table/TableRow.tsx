import React from 'react';

interface TableRowProps {
    columns: string[];
    rowData: any;
    onButtonClick: (id: number, fullName: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({ columns, rowData, onButtonClick }) => {
    const fullName = `${rowData.first_name} ${rowData.last_name}`; // Construct full name

    return (
        <tr>
            {columns.map((column) => (
                <td key={column}>
                    {column === 'fullName' ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <img
                                src={rowData.avatar}
                                alt={fullName}
                                style={{ width: 30, height: 30, borderRadius: '50%', marginRight: '1rem' }}
                            />
                            {fullName}
                        </div>
                    ) : (
                        rowData[column] !== null ? rowData[column] : 'N/A'
                    )}
                </td>
            ))}
            <td>
                <button
                    onClick={() => onButtonClick(rowData.user_id, fullName)}// Always pass fullName
                    className="btn btn-primary btn-sm"
                >
                    View
                </button>
            </td>
        </tr>
    );
};

export default TableRow;
