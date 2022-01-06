import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NavBar(props) {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    props.setAuth(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SuperHeroes
          </Typography>
          <Button color="inherit" onClick={handleLogOut}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
