import React from 'react';
import defaultImage from "../../assets/images/defaultImage.jpg"

interface Action {
    label: string;
    onClick: (id: number, fullName?: string) => void;
    icon?: string;
}

interface TableRowProps {
    columns: string[];
    rowData: any;
    actions?: Action[];
    isKoiFishPage?: boolean;
    isAddressPage?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ columns, rowData, actions = [], isKoiFishPage, isAddressPage  }) => {
    const fullName = `${rowData.first_name || rowData.name} ${rowData.last_name || ''}`.trim(); // Tạo fullName
console.log(rowData.avatar)
    return (
        <tr>
            {columns.map((column) => (
                <td key={column}>
                    {column === 'fullName' ? (
                        <div className="d-flex justify-content-center align-items-center ms-5" >
                            <img
                                src={rowData.avatar || defaultImage}
                                style={{ width: 35, height: 35, borderRadius: '50%',border: '1px solid #002d72'}}
                            />
                            <span className="flex-grow-1 text-center fw-bold" style={{width:"50px"}}>{fullName}</span>
                        </div>
                    ) : (
                        !rowData[column] ? '' : rowData[column]
                    )}
                </td>
            ))}
            <td>
                {actions.length > 0 ? (
                    <div className="dropdown ms-auto">
                        <i className="fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu dropdown-menu-end" >
                            {actions.map((action, index) => (
                                <li key={index}>
                                    <span className="dropdown-item" onClick={() => {
                                        const id = isKoiFishPage ? rowData.fish_id : isAddressPage ? rowData.address_id : rowData.user_id;
                                        action.onClick(id, fullName);
                                    }}>
                                        {action.icon && <i className={`${action.icon} mx-2`}></i>}
                                        {action.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <button
                        onClick={() => console.log("View ")}
                        className="btn btn-primary btn-sm"
                    >
                        View
                    </button>
                )}
            </td>
        </tr>
    );
};

export default TableRow;
