// MUI Imports
import { Box, Grid, Paper } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

// Local File Imports
import encodeUrlStr from "../../utils/encodeUrlStr";

// React Imports
import { useDispatch, useSelector } from "react-redux";

// Render a menu item based on the object being passed
//  activeKey is used to target specifically named attributes (e.g. site_name instead of name
//  when the next list is rendered.
function NavExploreItem({ listObj, activeKey, setActiveKey, setPrevState }) {
  const listType = useSelector((store) => store.viewReducer.listTypeReducer);
  const dispatch = useDispatch();
  const lightTheme = createTheme({ palette: { mode: "light" } });

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    lineHeight: "60px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
            dispatch({ type: "FETCH_EXPLORE_SITES" });
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
    <>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={12} key={index} onClick={handleClick}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 4,
                gap: 2,
                elevation: 3,
                bgcolor: "background.default",
              }}
            >
              {/* map through whatever's in the explore menu */}
              <Item> {listObj[activeKey]} </Item>
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </>
  );
}

export default NavExploreItem;
