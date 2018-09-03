import * as React from "react";
import { Table } from "react-bootstrap";

interface DataTableProps {
  columns: string[]
  widths?: string[]
}

const DataTable: React.SFC<DataTableProps> = ({ children, widths, columns }) => (
  <Table striped bordered>
    <thead>
      <tr>
        {columns.map((column, i) => (
          <th key={i} style={widths && widths[i] ? { width: widths[i] } : undefined}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Table>
);

export default DataTable;
