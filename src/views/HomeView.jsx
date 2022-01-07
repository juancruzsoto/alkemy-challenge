import React from "react";
import Home from "../components/Home";
import NavBar from "../components/NavBar";
import Grid from "@mui/material/Grid";

function HomeView(props) {
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <NavBar {...props} />
        </Grid>
        <Grid item xs={12}>
          <Home {...props} />
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeView;
