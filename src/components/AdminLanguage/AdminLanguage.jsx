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

function AdminLanguage() {
  const dispatch = useDispatch();
  
  // Grabbing the Languages data to parse through
  const languages = useSelector(
    (store) => store.adminReducer.adminLanguagesReducer
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
              <TableCell align="center">Glottocode</TableCell>
              <TableCell align="center">Global Speakers</TableCell>
              <TableCell align="center">SC Speakers</TableCell>
              <TableCell align="center">Endonym</TableCell>
              <TableCell align="center">Edit/Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {languages.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row" align="center">
                  {row.language}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.glottocode}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.global_speakers}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.sc_speakers}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.endonym}
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
  );
}

export default AdminLanguage;
