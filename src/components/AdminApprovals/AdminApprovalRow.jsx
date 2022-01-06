import React from "react";
import { useDispatch } from "react-redux";

//mui styles
import {
    Button,
    TableRow,
    TableCell,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export default function AdminApprovalRow({ user }) {

    //local useState
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);

    //hooks
    const dispatch = useDispatch();


    //opens dialogue for delete confirmation button
    const handleRejection = () => {
        console.log("Delete", user.id);
        //opens dialogue option 
        setOpenDelete(true);
    };

    //delete from user table
    const handleDelete = () => {
        dispatch({
            type: 'DELETE_UNAPPROVED',
            payload: user.id
        })
    };

    //**needs to be fixed, do not delete */
    //opens dialogue for approval confirmation button 
    const handleApproval = () => {
        console.log("Approve user", user.id);
        //opens dialogue option 
        setOpenConfirm(true);
    };

    //Approve user for admin clearance
    const handleConfirm = () => {
        console.log(user.id, "to be confirmed")
        dispatch({
        type: 'APPROVE_ADMIN',
        payload: user.id
        })
    };

    //onClose of the all dialogues
    const handleClose = () => {
        setOpenDelete(false);
        setOpenConfirm(false);
    };
    return (
        <>
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

            {/* Dialogue option for delete confirmation */}
            <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="Delete user">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clicking "yes" will delete this request from the database
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </DialogActions>
            </Dialog>

            {/* Dialogue option for approval confirmation */}
            <Dialog
                open={openConfirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="Approve user">
                    {"Please Confirm"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clicking "approve" will confirm this user for admin clearance
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm}>Approve</Button>
                    <Button onClick={handleClose}>cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
} //end AdminApprovalRow