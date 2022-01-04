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
  const approvals = useSelector(
    (store) => store.adminReducer.adminApprovalsReducer
  );
  const handleApproval = () => {
    console.log("Edit");
  };
  const handleRejection = () => {
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
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Approve/Decline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approvals?.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  <Button
                    sx={{ mr: 1 }}
                    variant="contained"
                    onClick={handleApproval}
                  >
                    Approve
                  </Button>
                  <Button variant="contained" onClick={handleRejection}>
                    Decline
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
