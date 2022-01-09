// Local File Imports
import encodeUrlStr from "../../utils/encodeUrlStr";

// MUI Imports
import { Box, Grid, Typography } from "@mui/material";

// React Imports
import { useDispatch, useSelector } from "react-redux";

// Render a menu item based on the object being passed
//  activeKey is used to target specifically named attributes (e.g. site_name instead of name
//  when the next list is rendered.
function NavExploreItem({ listObj, activeKey, setActiveKey, padding }) {
  const dispatch = useDispatch();
  const listType = useSelector((store) => store.viewReducer.listTypeReducer);
  let boxHeight = padding;
  //Conditionally handle clicks depending on the context of
  //  What kind of items are being mapped into the list
  const handleClick = () => {
    let queryObj;
    switch (listType) {
      // Handle clicks on the default submenu (categories, regions, sites, languages)
      case "DEFAULT":
        switch (listObj[activeKey]) {
          case "Categories":
            dispatch({ type: "FETCH_CATEGORIES" });
            dispatch({ type: "SET_TYPE", payload: "CATEGORIES" });
            break;
          case "Regions":
            dispatch({ type: "FETCH_REGIONS" });
            dispatch({ type: "SET_TYPE", payload: "REGIONS" });
            break;
          case "Sites":
            setActiveKey("site_name");
            dispatch({ type: "FETCH_SITES" });
            dispatch({ type: "SET_TYPE", payload: "SITES" });
            break;
          case "Languages":
            setActiveKey("language");
            dispatch({ type: "FETCH_LANGUAGES" });
            dispatch({ type: "SET_TYPE", payload: "LANGUAGES" });
          default:
            console.log("EXPLORE CLICK ERR: NOT FOUND");
        }
        break;

      //handle clicks on other listTypes
      case "LANGUAGES":
        queryObj = { language: listObj.language };
        dispatch({ type: "SUBMIT_QUERY", payload: encodeUrlStr(queryObj) });
        break;
      case "SITES":
        queryObj = { site: listObj.site_name };
        dispatch({ type: "SUBMIT_QUERY", payload: encodeUrlStr(queryObj) });
        break;
      case "REGIONS":
        queryObj = { region: listObj.name };
        dispatch({ type: "SUBMIT_QUERY", payload: encodeUrlStr(queryObj) });
        break;
      case "CATEGORIES":
        queryObj = { category: listObj.name };
        dispatch({ type: "SUBMIT_QUERY", payload: encodeUrlStr(queryObj) });
        break;
      default:
        console.log("EXPLORE CLICK ERR: NO LISTTYPE");
    }
  };
  
  return (
    <Grid item xs={12} onClick={handleClick}>
      <Box
        borderRadius={4}
        component="button"
        sx={{
          mt: 2,
          border: 1,
          p: boxHeight,
          width: 2 / 2,
          boxShadow: 3,
          backgroundColor: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#c9d2e3",
            cursor: "pointer",
          },
        }}
      >
        <Typography variant="h6">{listObj[activeKey]}</Typography>
      </Box>
    </Grid>
  );
}

export default NavExploreItem;
