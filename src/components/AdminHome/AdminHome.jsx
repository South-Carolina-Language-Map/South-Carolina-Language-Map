// React-related Imports
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHomeForm from "./AdminHomeForm";

// MUI Imports
import {
  Grid,
  Table,
  Button,
  TableRow,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import AdminSiteRow from "./AdminSiteRow";

function AdminHome() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Grabbing needed data from the store:
  const regions = useSelector((store) => store.viewReducer.listReducer);
  const sites = useSelector((store) => store.adminReducer.adminSiteReducer);

  // The below 2 functions allow there to be multiple pages on the table.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_EXPLORE_SITES" });
    dispatch({ type: "FETCH_REGIONS" });
  }, []);

  return (
    <>
      <Typography>Add New Site</Typography>
      <Grid container spacing={.5}>
        <Grid item>
          <AdminHomeForm/>
        </Grid>
      </Grid>
      <Grid container sx={{ pt: 3 }}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Edit//Delete</TableCell>
                </TableRow>
              </TableHead>
             
                {sites
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((site) => {
                    return (
                      <TableBody key={site.id}>
                      <AdminSiteRow
                      site={site}
                      regions={regions}/>
                      </TableBody>
                    );
                  })}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={sites.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
}

export default AdminHome;
