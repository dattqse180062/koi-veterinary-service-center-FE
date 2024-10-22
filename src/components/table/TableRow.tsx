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

    actions?: Action[]; // Hành động
    isKoiFishPage?: boolean; // Thêm prop để xác định trang
    isAddressPage?: boolean; // Thêm prop để xác định trang
    isAppointmentPage?: boolean; // Thêm prop để xác định trang
    isFeedbackPage?: boolean; // Thêm prop để xác định trang

}

// Function to format DateTime
const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    
    return date.toLocaleString('en-GB', options);
};

    const TableRow: React.FC<TableRowProps> = ({ columns, rowData, actions = [], isKoiFishPage, isAddressPage, isAppointmentPage, isFeedbackPage }) => {
        // console.log("date", formatDateTime(rowData.created_date));
    const fullName = `${rowData.first_name || rowData.name} ${rowData.last_name || ''}`.trim(); // Tạo fullName
    const dayOfSlot = `${rowData.time_slot.day}/${rowData.time_slot.month}/${rowData.time_slot.year}`.trim(); // Tạo dayOfSlot

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
                    )  : column === 'dayOfSlot' ? (
                        <div>{dayOfSlot}</div> // Format datetime column
                    )  : column === 'datetime' ? (
                        <div>{rowData.created_date}</div> // Format datetime column
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

                                        const id = isKoiFishPage ? rowData.fish_id : isAddressPage ? rowData.address_id : isAppointmentPage ? rowData.appointment_id : isFeedbackPage ? rowData.feedback_id : rowData.user_id; // Lấy id tương ứng
                                        action.onClick(id, fullName); // Pass fullName as an argument
                                    }

                                    }>

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
