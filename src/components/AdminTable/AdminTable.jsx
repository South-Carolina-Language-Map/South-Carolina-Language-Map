import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminTable() {
  const dispatch = useDispatch();
  const regions = useSelector((store) => store.viewReducer.listReducer);
  const sites = useSelector((store) => store.adminReducer.adminSiteReducer);
  // const sites = useSelector((store) => store.viewReducer.sitesReducer);
  const catagories = useSelector(
    (store) => store.adminReducer.adminCategoriesReducer
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
    {
      id: "population",
      label: "Population",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Size\u00a0(km\u00b2)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "density",
      label: "Density",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];
  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES" });
  }, []);
  const handleEdit = () => {
    console.log("Edit");
  };
  const handleDelete = () => {
    console.log("Delete");
  };
  return (
    <Grid container sx={{ pt: 3 }}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Language</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sites
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((site) => {
                  return (
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
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          page={page}
          component="div"
          count={sites.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 25, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}

export default AdminTable;
