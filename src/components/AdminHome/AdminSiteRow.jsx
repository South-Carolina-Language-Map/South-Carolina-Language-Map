import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// MUI Imports
import {
    Button,
    TableRow,
    TableCell,
    Stack
} from "@mui/material";


export default function AdminSiteRow({ regions, site, languages }) {

    //local state
    const [handleEditMode, setHandleEditMode] = useState(false)
    const [edit, setEdit] = useState(site)

    //hooks
    const dispatch = useDispatch();

    // PUT for this site ID
    const handleEdit = () => {
        console.log("Edit", site, regions);
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
                <TableCell>
                    {/* Getting the name of a specific region from the sites included region id */}
                    {regions?.map((region) => {
                        if (region.id === site.region_id) {
                            console.log('==================>', region.name)
                            return region.name;
                        }
                    })}
                </TableCell>
                <TableCell>
                    {/* Getting the name of a specific region from the sites included region id */}
                    {languages?.map((language) => {
                        if (language.id === site.language_id) {
                            console.log('==================>', language.language)
                            return language.language;
                        }
                    })}
                </TableCell>
                <TableCell>
                    <Stack direction="row" spacing={1}>
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
                    </Stack>
                </TableCell>
            </TableRow>



        </>
    )
} //end AdminSiteRow