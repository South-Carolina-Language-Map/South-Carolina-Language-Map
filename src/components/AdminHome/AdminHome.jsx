// React-related Imports
import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Local Files Import
import AutoCompleteLanguage from "./AutoCompleteLanguage";

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

function AdminHome() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Grabbing needed data from the store:
  const regions = useSelector((store) => store.viewReducer.listReducer);
  const sites = useSelector((store) => store.adminReducer.adminSiteReducer);

  // Defining what to do when edit or delete are pressed:
  const handleEdit = () => {
    console.log("Edit");
  };
  const handleDelete = () => {
    console.log("Delete");
  };

  // The below 2 functions allow there to be multiple pages on the table.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Updating the stores with the most up-to-date information
  useEffect(() => {
    dispatch({ type: "FETCH_ALL" });
    dispatch({ type: "FETCH_REGIONS" });
  }, []);

  return (
    <>
      <Typography>Add New Site</Typography>
      <Grid container spacing={0.5}>
        <Grid item xs>
          <TextField
            required
            id="filled-required"
            label="Site Name"
            variant="standard"
            helperText="ex. Raleigh"
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="filled-required"
            label="Address"
            variant="standard"
            helperText="Address"
          />
        </Grid>
        <Grid item xs>
          <AutoCompleteLanguage />
          <Link>Don't see your language? Click here!</Link>
        </Grid>
        <Grid item xs>
          <Button variant="contained" endIcon={<PublishIcon />}>
            Submit
          </Button>
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
              <TableBody>
                {sites
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((site) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell>{site.site_name}</TableCell>
                        <TableCell>{site.address}</TableCell>
                        <TableCell>{site.language}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {/* Getting the name of a specific region from the sites included region id */}
                          {regions?.map((region) => {
                            if (region.id === site.region_id) {
                              return region.name;
                            }
                          })}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            sx={{ mr: 1 }}
                            variant="contained"
                            onClick={handleEdit}
                          >
                            Edit
                          </Button>
                          <Button variant="contained" onClick={handleDelete}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
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
