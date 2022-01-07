// React Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import {
  Grid,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from "@mui/material";

//components
import AdminApprovalRow from "./AdminApprovalRow";

function AdminApprovals() {
  const dispatch = useDispatch();
  const approvals = useSelector(
    (store) => store.adminReducer.adminApprovalsReducer
  );

  useEffect(() => {
    dispatch({ type: "FETCH_UNAPPROVED" });
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
          {approvals?.map((user) => (
            <TableBody key={user.id}>
              <AdminApprovalRow user={user} />
            </TableBody>
          ))}
        </Table>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}

export default AdminApprovals;
