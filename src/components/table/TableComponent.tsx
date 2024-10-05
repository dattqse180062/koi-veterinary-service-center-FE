import React from 'react';
import TableRow from './TableRow';

interface TableComponentProps {
    columns: string[];
    columnHeaders: string[]; // Thêm thuộc tính mới để nhận tiêu đề cột tùy chỉnh
    data: any[];
    avatarKey?: string;
    fullNameKeys?: { firstName: string; lastName: string };
    onRowButtonClick: (id: number, fullName: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, columnHeaders, data, onRowButtonClick }) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-small table-striped">
                <thead className="table-light">
                <tr>
                    {columnHeaders.map((header, index) => (
                        <th key={index}>{header}</th>  // Hiển thị tiêu đề cột tùy chỉnh
                    ))}
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <TableRow
                        key={item[columns[0]]}  // Assuming first column is ID
                        columns={columns}
                        rowData={item}
                        onButtonClick={onRowButtonClick}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
