// React-related Imports
import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

function AdminHome() {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const dispatch = useDispatch();

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
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Region</TableCell>
                <TableCell align="center">Language</TableCell>
                {/* <TableCell align="center">Description</TableCell> */}
                <TableCell align="center">Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sites.map((site) => (
                <TableRow>
                  <TableCell component="th" scope="row" align="center">
                    {site.site_name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {site.address}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {/* Getting the name of a specific region from the sites included region id */}
                    {regions?.map((region) => {
                      if (region.id === site.region_id) {
                        return region.name;
                      }
                    })}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {site.language}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{ mr: 1, mb: 1 }}
                      variant="contained"
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      sx={{ mb: 1 }}
                      variant="contained"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
}

export default AdminHome;
