import Bchar from "./Bchar";
import { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Vcalendar from "./Vcalendar";
import Table from "./Table";
import Tchar from "./Tchar";
import WaterTowerContext from "../../../context/waterTower/waterTowerContext";
import BuildingContext from "../../../context/building/buildingContext";
import AuthContext from "../../../context/auth/authContext";

const Home = () => {
  const buildingContext = useContext(BuildingContext);
  const { buildings } = buildingContext;

  //init auth context
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
  }, []);
  //water tower context
  const waterTowerContext = useContext(WaterTowerContext);
  const { watertowers } = waterTowerContext;
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      height: 300,

      // color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4} lg={6}>
          <Paper className={classes.paper}>
            <Bchar label='Building' letter='B' color='primary' />
          </Paper>
        </Grid>
        <Grid item xs={6} md={4} lg={6}>
          <Paper className={classes.paper}>
            <Tchar label='Water Tower' letter='W' color='secondary' />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={12}>
          <Paper className={classes.paper}>
            <Vcalendar label='Annual Expenses' letter='E' color='primary' />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper} style={{ height: 400 }}>
            <Table name={"Building Name"} data={buildings} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper} style={{ height: 400 }}>
            <Table name={"WaterTower Name"} data={watertowers} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
