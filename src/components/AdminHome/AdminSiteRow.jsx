import * as React from "react";
import { useEffect} from "react";
import { useDispatch } from "react-redux";

// MUI Imports
import {
    Button,
    TableRow,
    TableCell,
} from "@mui/material";


export default function AdminSiteRow({ regions, site }) {

    //hooks
    const dispatch = useDispatch();

    // PUT for this site ID
    const handleEdit = () => {
        console.log("Edit", site);
    };

    //DELETE for this site ID
    const handleDelete = () => {
        console.log("Delete", site.id);
        dispatch({
            type: 'DELETE_SITE',
            payload: site.id
        })
    };

    return (
        <>
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



        </>
    )
} //end AdminSiteRow