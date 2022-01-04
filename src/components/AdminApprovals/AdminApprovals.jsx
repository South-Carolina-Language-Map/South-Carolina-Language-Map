// React Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import {
  Grid,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from "@mui/material";

function AdminApprovals() {
  const dispatch = useDispatch();
  const catagories = useSelector(
    (store) => store.adminReducer.adminCategoriesReducer
  );
  const handleEdit = () => {
    console.log("Edit");
  };
  const handleDelete = () => {
    console.log("Delete");
  };

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES" });
  }, []);
  
  return (
    <Grid container sx={{ pt: 3 }}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Edit/Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {catagories.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row" align="center">
                  {row.name}
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
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}

export default AdminApprovals;

