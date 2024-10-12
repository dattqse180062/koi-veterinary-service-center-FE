import React from 'react';
import TableRow from './TableRow';
import "../../styles/Schedule.css"
interface TableComponentProps {
    columns: string[];
    columnHeaders: string[];
    data: any[];
    actions?: { label: string; icon: string; onClick: (id: number, fullName?: string) => void }[]; // Actions prop
    isKoiFishPage?: boolean; // Thêm prop
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, columnHeaders, data, actions, isKoiFishPage }) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-small table-small-auto table-striped">
                <thead className="table-light">
                <tr>
                    {columnHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <TableRow
                        key={item[columns[0]]} // Assuming first column is ID
                        columns={columns}
                        rowData={item}
                        actions={actions} // Pass actions prop
                        isKoiFishPage={isKoiFishPage} // Truyền prop vào đây
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
