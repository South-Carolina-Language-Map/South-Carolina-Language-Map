import {
    Grid,
    Table,
    Button,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
} from "@mui/material";

export default function AdminApprovalRow({ user }) {

    //edit clearance_level from 0 -> 1 creating admin clearance
    const handleApproval = () => {
        console.log("Edit");
    };

    //delete from user table
    const handleRejection = () => {
        console.log("Delete");
    };


    return (
        <TableRow>
            <TableCell component="th" scope="row" align="center">
                {user.fullName}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
                {user.username}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
                {user.email}
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
    )
} //end AdminApprovalRow