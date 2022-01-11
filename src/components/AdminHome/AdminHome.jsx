// React-related Imports
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import AdminSiteRow from "./AdminSiteRow";
import AdminHomeForm from "./AdminHomeForm";

// MUI Imports
import {
  Grid,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

function AdminHome() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Grabbing needed data from the store:
  const regions = useSelector((store) => store.adminReducer.adminRegionsReducer);
  const sites = useSelector((store) => store.adminReducer.adminSiteReducer);
  const languages = useSelector(
    (store) => store.adminReducer.adminLanguagesReducer
  );

  // The below 2 functions allow there to be multiple pages on the table.
  const handleChangePage = (event, newPage) => {setPage(newPage);};

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_SITES" });
    dispatch({ type: "FETCH_REGIONS" });
    dispatch({ type: "FETCH_LANGUAGES" });
  }, []);

  
  return (
    <Grid container>
      <Grid item xs={12} sx={{ m: 4 }}>
        <Typography variant="h4" textAlign="center" sx={{ p: 2 }}>
          Add New Site
        </Typography>
        <AdminHomeForm />
      </Grid>
      <Grid item xs={12} sx={{ m: 2 }}>
        <Typography variant="h3" textAlign="center" sx={{ p: 2 }}>
          All Sites
        </Typography>
        <TableContainer sx={{ maxHeight: 550 }}>
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
                      regions={regions}
                      languages={languages}
                    />
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
    </Grid>
  );
}

export default AdminHome;
