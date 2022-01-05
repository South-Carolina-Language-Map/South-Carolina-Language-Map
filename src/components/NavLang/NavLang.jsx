import { Grid, Paper, Stack, Typography, Divider } from "@mui/material";

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
      <Grid item xs={12}>
        <Paper elevation={4}>
          <Typography variant="h3" sx={{ pt: 2, textAlign: "center" }}>
            {currentLanguage.language}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Endonym: {currentLanguage.endonym}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" fullWidth />}
        >
          <Typography>
            Global Speakers: {currentLanguage.global_speakers}
          </Typography>
          <Typography>SC Speakers: {currentLanguage.sc_speakers}</Typography>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <p></p>
      </Grid>
      <Grid item xs={12}>
        <Typography>Glottocode: {currentLanguage.glottocode}</Typography>
        <Typography>Description: {currentLanguage.description}</Typography>
        <Typography>Status: {currentLanguage.status}</Typography>
      </Grid>
    </Grid>
  );
}

export default NavLang;
