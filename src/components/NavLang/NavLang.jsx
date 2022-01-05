import { Grid, Typography } from "@mui/material";

function NavLang({ language }) {
  // let currentLanguage = language;
  let currentLanguage = {
    category_id: 1,
    description: "",
    endonym: "Yamasee",
    global_speakers: 10,
    glottocode: "NA",
    id: 4,
    language: "Yamasee",
    sc_speakers: 20,
    status: "Historic",
  };

  return (
    <Grid container>
      <Grid item>
        <Typography>Glottocode: {currentLanguage.glottocode}</Typography>
        <Typography>Language Name: {currentLanguage.language}</Typography>
        <Typography>Endonym: {currentLanguage.endonym}</Typography>
        <Typography>Description: {currentLanguage.description}</Typography>
        <Typography>Global Speakers: {currentLanguage.global_speakers}</Typography>
        <Typography>SC Speakers: {currentLanguage.sc_speakers}</Typography>
        <Typography>Status: {currentLanguage.status}</Typography>
      </Grid>
    </Grid>
  );
}

export default NavLang;
