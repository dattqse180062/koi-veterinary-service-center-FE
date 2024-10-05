import React from 'react';

interface Action {
    label: string;
    onClick: (id: number, fullName?: string) => void; // Giữ nguyên
    icon?: string; // Tùy chọn
}

interface TableRowProps {
    columns: string[];
    rowData: any;
    actions?: Action[]; // Hành động
    isKoiFishPage?: boolean; // Thêm prop để xác định trang
}

const TableRow: React.FC<TableRowProps> = ({ columns, rowData, actions = [], isKoiFishPage }) => {
    const fullName = `${rowData.first_name || rowData.name} ${rowData.last_name || ''}`.trim(); // Tạo fullName

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
                {actions.length > 0 ? (
                    <div className="dropdown ms-auto">
                        <i className="fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {actions.map((action, index) => (
                                <li key={index}>
                                    <span className="dropdown-item" onClick={() => action.onClick(isKoiFishPage ? rowData.fish_id : rowData.user_id, fullName)}>
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
