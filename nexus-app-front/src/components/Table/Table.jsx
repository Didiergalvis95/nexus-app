import * as React from "react";
import "./Table.css";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from "axios";

export const CustomTable = () => {
  const [estadistica, setEstadistica] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const peticion = "http://127.0.0.1:8000/dashboard/venta";

  const getStack = async () => {
    try {
      const res = await axios.get(peticion);
      setEstadistica(res.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getStack();
  }, []);

  const columns = [
    {
      id: "nombre",
      label: "NOMBRE",
      minWidth: 170,
    },
    {
      id: "autor",
      label: "AUTOR",
      minWidth: 100,
    },
    {
      id: "anho_creacion",
      label: "AÑO DE CREACIÓN",
      minWidth: 170,
      align: "right",
    },
    {
      id: "cantidad",
      label: "CANTIDAD",
      minWidth: 170,
      align: "right",
      format: (value) =>
      typeof value === "string"
        ? parseFloat(value).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
        : value,
  },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", background: "#494848" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: "#6d6d6d",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {estadistica
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    {columns.map((column) => {
                    const value = column.id === 'cantidad' ? row.cantidad : row.anime[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          color: "white",
                        }}
                      >
                        {column.format && typeof value !== "object" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={estadistica.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: "white" }}
      />
    </Paper>
  );
};

