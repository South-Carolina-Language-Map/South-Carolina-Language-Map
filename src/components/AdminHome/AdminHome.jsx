import * as React from "react";
import AutoCompleteLanguage from "./AutoCompleteLanguage";
import PublishIcon from "@mui/icons-material/Publish";


import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

function AdminHome() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <TextField
            required
            id="filled-required"
            label="Required"
            variant="standard"
            helperText="ex. Raleigh"
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="filled-required"
            label="Required"
            variant="standard"
            helperText="Address"
          />
        </Grid>
        <Grid item xs>
          <AutoCompleteLanguage />
        </Grid>
        <Grid item xs>
          <Button variant="contained" endIcon={<PublishIcon />}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default AdminHome;

// import * as React from “react”;
// import Box from “@mui/material/Box”;
// import TextField from “@mui/material/TextField”;
// import AutoCompleteLanguage from “./AutoCompleteLanguage”;
// import Grid from “@mui/material/Grid”;
// import PublishIcon from “@mui/icons-material/Publish”;
// import Button from “@mui/material/Button”;
// import Typography from ‘@mui/material/Typography’
// import Paper from “@mui/material/Paper”;
// import Table from “@mui/material/Table”;
// import TableBody from “@mui/material/TableBody”;
// import TableCell from “@mui/material/TableCell”;
// import TableContainer from “@mui/material/TableContainer”;
// import TableHead from “@mui/material/TableHead”;
// import TablePagination from “@mui/material/TablePagination”;
// import TableRow from “@mui/material/TableRow”;
// import { useEffect } from “react”;
// import { useDispatch, useSelector } from “react-redux”;
// import { Link } from “react-router-dom”;
// function AdminHome() {
//   const dispatch = useDispatch();
//   const sites = useSelector((store) => store.viewReducer.sitesReducer);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   useEffect(() => {
//     dispatch({ type: "FETCH_ALL" });
//   }, []);
//   return (
//     <>
//       <Typography>Add New Site</Typography>
//       <Grid container spacing={0.5}>
//         <Grid item xs>
//           <TextField
//             required
//             id="filled-required"
//             label="Site Name"
//             variant="standard"
//             helperText="ex. Raleigh"
//           />
//         </Grid>
//         <Grid item xs>
//           <TextField
//             required
//             id="filled-required"
//             label="Address"
//             variant="standard"
//             helperText="Address"
//           />
//         </Grid>
//         <Grid item xs>
//           <AutoCompleteLanguage />
//           <Link>Don’t see your language? Click here!</Link>
//         </Grid>
//         <Grid item xs>
//           <Button variant="contained" endIcon={<PublishIcon />}>
//             Submit
//           </Button>
//         </Grid>
//       </Grid>
//     </>
//   );
// }
