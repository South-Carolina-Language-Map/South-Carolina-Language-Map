import { useDispatch, useSelector } from "react-redux";


//mui styles
import {
    Button,
    TableRow,
    TableCell,
} from "@mui/material";

export default function AdminApprovalRow({ user }) {

    //hooks
    const dispatch = useDispatch();

    //edit clearance_level from 0 -> 1 creating admin clearance
    const handleApproval = () => {
        console.log("Edit");
    };

    //delete from user table
    const handleRejection = () => {
        console.log("Delete", user.id);
        //need to do dialogue here******
        dispatch({
            type: 'DELETE_UNAPPROVED',
            payload: user.id
        })
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