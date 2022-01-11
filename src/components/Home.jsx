import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import homeStyle from "../assets/homeStyle";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  LinearProgress,
  Modal,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";
import LoadScreen from "./LoadScreen";
import axios from "axios";
import { TOKEN_API, URL } from "../config";

const useStyles = makeStyles(homeStyle);

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box> */}
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Home(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [heroesID, setHeroesID] = useState();
  const [infoCards, setInfoCards] = useState([]);
  const [rows, setRows] = useState([]);
  const [teamStats, setTeamStats] = useState({
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  });

  const colorCard = {
    good: "#c8e6c9",
    bad: "#ffcdd2",
  };
  const colorPowerstats = {
    intelligence: "primary",
    strength: "inherit",
    speed: "warning",
    durability: "success",
    power: "error",
    combat: "secondary",
  };

  useEffect(() => {
    console.log(localStorage.getItem('Heroes'))
    heroesID.map((ID) => {
      axios
        .get(URL + TOKEN_API + "/" + ID)
        .then((result) => {
          console.log(result);
          setInfoCards((infocurrent) =>
            infocurrent.concat({
              id: result.data.id,
              image: result.data.image.url,
              name: result.data.name,
              powerstats: result.data.powerstats,
              weight: result.data.appearance.weight[1],
              height: result.data.appearance.height[1],
              alias: result.data.biography.aliases,
              eyecolor: result.data.appearance["eye-color"],
              haircolor: result.data.appearance["hair-color"],
              base: result.data.work.base,
              alignment: result.data.biography.alignment,
            })
          );
        })
        .catch((e) => {
          console.log("ERROR", e.message);
        });
    });
    axios
      .get(URL + TOKEN_API + "/search/" + "Ab ")
      .then((result) => {
        console.log(result);
        if (result.data.response !== "error") {
          setRows(result.data.results);
        }
      })
      .catch((e) => {
        console.log("ERROR", e.message);
      });
  }, []);

  useEffect(() => {
    if (infoCards.length === heroesID.length) {
      let sumStats = {
        intelligence: 0,
        strength: 0,
        speed: 0,
        durability: 0,
        power: 0,
        combat: 0,
      };
      infoCards.map((Hero) => {
        Object.keys(Hero.powerstats).map((skill) => {
          console.log(Hero.powerstats[skill], teamStats[skill], skill);
          sumStats[skill] = sumStats[skill] + parseInt(Hero.powerstats[skill]);
        });
      });
      setTeamStats(sumStats);
    }
  }, [infoCards]);

  const handleChange = () => {
    setRows([]);
    axios
      .get(
        URL +
          TOKEN_API +
          "/search/" +
          document.getElementById("outlined-search-input").value
      )
      .then((result) => {
        if (result.data.response !== "error") {
          console.log(result.data.results);
          setRows(result.data.results);
        } else {
          setRows([
            { name: "", image: { url: "" }, biography: { alignment: "" } },
            { name: "", image: { url: "" }, biography: { alignment: "" } },
            { name: "", image: { url: "" }, biography: { alignment: "" } },
          ]);
        }
      })
      .catch((e) => {
        console.log("ERROR", e.message);
      });
  };

const handleAddHero = (e) =>{
  console.log(e.target.id)
  setHeroesID((currentHero) => currentHero.concat(e.target.id))
  localStorage.setItem("Heroes",heroesID.concat(e.target.id))
  axios
        .get(URL + TOKEN_API + "/" + e.target.id)
        .then((result) => {
          console.log(result);
          setInfoCards((infocurrent) =>
            infocurrent.concat({
              id: result.data.id,
              image: result.data.image.url,
              name: result.data.name,
              powerstats: result.data.powerstats,
              weight: result.data.appearance.weight[1],
              height: result.data.appearance.height[1],
              alias: result.data.biography.aliases,
              eyecolor: result.data.appearance["eye-color"],
              haircolor: result.data.appearance["hair-color"],
              base: result.data.work.base,
              alignment: result.data.biography.alignment,
            })
          );
        })
  setModalShow(false)
}
  
  return (
    <div className={classes.container}>
      {loading && <LoadScreen />}
      <Grid container spacing={3} justifyContent="center" alignItems="flex-end">
        <Grid item xs={12}>
          <Typography
            gutterBottom
            variant="h4"
            style={{ textAlign: "center" }}
            className={classes.title}
          >
            Conforma tu equipo de Superhéroes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            gutterBottom
            variant="h6"
            // style={{ textAlign: "center" }}
            className={classes.titleC}
          >
            Conforma tu equipo de Superhéroes {teamStats["strength"]}
          </Typography>
          {console.log(teamStats)}
          {console.log(infoCards)}
          {Object.keys(teamStats).map((skill) => {
            console.log(teamStats[skill]);
          })}
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              "& > :not(style)": {
                m: 1,
                width: "100%",
                minHeight: "800px",
              },
            }}
          >
            <Paper variant="outlined" style={{ width: "90%" }}>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
                {infoCards.length > 0 &&
                  infoCards.map((Hero) => {
                    return (
                      <Grid item xs={12} md={6} lg={4}>
                        <Card
                          sx={{
                            display: "flex",
                            backgroundColor: colorCard[Hero.alignment],
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                            }}
                          >
                            <CardContent
                              sx={{ flex: "1 0 auto" }}
                              style={{ width: "100%" }}
                            >
                              <Typography component="div" variant="h5">
                                {Hero.name}
                              </Typography>

                              {Object.keys(Hero.powerstats).map((skill) => {
                                return (
                                  <>
                                    <Typography
                                      variant="subtitle2"
                                      color="text.secondary"
                                      component="div"
                                    >
                                      {skill.charAt(0).toUpperCase() +
                                        skill.slice(1)}
                                    </Typography>
                                    <Box sx={{ width: "100%" }}>
                                      <LinearProgressWithLabel
                                        value={
                                          Hero.powerstats[skill] > 0
                                            ? Hero.powerstats[skill]
                                            : 0
                                        }
                                        color={colorPowerstats[skill]}
                                      />
                                    </Box>
                                  </>
                                );
                              })}

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  pl: 1,
                                  pb: 1,
                                  marginTop: "10px",
                                }}
                              >
                                Ver detalle
                              </Box>
                            </CardContent>
                          </Box>
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <CardMedia
                              component="img"
                              sx={{ width: "95%" }}
                              src={Hero.image}
                              alt="Live from space album cover"
                              style={{ marginLeft: "auto" }}
                            />
                          </Box>
                        </Card>
                      </Grid>
                    );
                  })}
                {heroesID.length < 6 && (
                  <Grid item xs={12} md={6} lg={4}>
                    <Card
                      sx={{
                        display: "flex",
                        // backgroundColor: colorCard[Hero.alignment],
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <CardContent
                          sx={{ flex: "1 0 auto" }}
                          style={{ width: "100%" }}
                        >
                          <Typography
                            variant="h5"
                            style={{ width: "100%", justifyContent: "center" }}
                          >
                            Add a New Hero
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              pl: 1,
                              pb: 1,
                              marginTop: "10px",
                            }}
                          >
                            <IconButton
                              aria-label="delete"
                              size="large"
                              style={{ fontSize: 100, width: "50%" }}
                            >
                              <AddCircleIcon
                                fontSize="inherit"
                                onClick={() => {
                                  setModalShow(true);
                                }}
                              />
                            </IconButton>
                            <Skeleton
                              sx={{ bgcolor: "#bdbdbd", marginLeft: "auto" }}
                              variant="rectangular"
                              width="100%"
                              height={276}
                            />
                          </Box>
                        </CardContent>
                      </Box>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Paper>
            {/* <Paper variant="outlined" square /> */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Modal
            open={modalShow}
            onClose={() => setModalShow(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "55%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                bgcolor: "background.paper",
                p: 4,
              }}
            >
              <Paper
                variant="outlined"
                style={{ width: "90%", backgroundColor: "#e0e0e0" }}
              >
                <Box
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    pl: 1,
                    pb: 1,
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-search-input"
                    label="Buscar"
                    autoComplete="off"
                  />
                  <Button variant="contained" onClick={handleChange}>
                    Buscar
                  </Button>
                </Box>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell align="right">
                            Alignment
                          </StyledTableCell>
                          <StyledTableCell align="right">Image</StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.length > 0 &&
                          rows.map((row) => (
                            <StyledTableRow key={row.name}>
                              <StyledTableCell component="th" scope="row">
                                {row.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.biography.alignment}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <img
                                  src={row.image.url}
                                  style={{ width: "100px" }}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.name !== "" && (
                                  <Button
                                    variant="contained"
                                    id={row.id}
                                    endIcon={<AddIcon />}
                                    onClick={handleAddHero}
                                  >
                                    Add
                                  </Button>
                                )}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Paper>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </div>
  );
}
