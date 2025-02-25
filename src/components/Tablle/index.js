import React from 'react';
import './table.css';
import { Typography } from '@mui/material';

const Table = ({ columns, rows,onRowClick }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>
                <Typography
                  fontSize={column.fontSize || "24px"}
                  fontWeight={column.fontWeight || 400}
                  color={column.color || "#2F2F2F"}
                >
                  {column.label}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} onClick={() => onRowClick(row)} style={{ cursor: 'pointer' }}>
              {columns.map((column) => (
                <td key={column.field}>
                  <Typography
                    fontSize={column.cellFontSize || "22px"}
                    fontWeight={column.cellFontWeight || 400}
                    color={column.cellColor || "#353535"}
                  >
                    {row[column.field]}
                  </Typography>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
