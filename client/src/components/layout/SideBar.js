import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import HomeWorkRoundedIcon from "@material-ui/icons/HomeWorkRounded";
import EventAvailableRoundedIcon from "@material-ui/icons/EventAvailableRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/home/Home";
import Companies from "../pages/companies/Companies";
import Expenses from "../pages/expenses/Expenses";
import Project from "../pages/projects/Project";
import Calendar from "../pages/calendar/Calendar";
import { Toaster } from "react-hot-toast";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import WaterTowerContext from "../../context/waterTower/waterTowerContext";
import BuildingContext from "../../context/building/buildingContext";
import BuildingStepsContext from "../../context/building-steps/buildingtStepsContext";
import WaterTowerStepsContext from "../../context/watertower-steps/waterTowerStepsContext";
import Register from "../auth/Register";
import Login from "../auth/Login";
import AuthContext from "../../context/auth/authContext";
import PrivateRoute from "../../routing/PrivateRoute";
import User from "../pages/users/User";
import UserContext from "../../context/users/userContext";
import AdminRoute from "../../routing/AdminRoute";
import Exporter from "../pages/exporter/Exporter";
const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),

    // height: "1000px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

export default function SideBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // init auth context
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logOut, loadUser } = authContext;
  useEffect(() => {
    loadUser();
  }, []);

  // init water tower
  const waterTowerContext = useContext(WaterTowerContext);
  const { watertowers, updateBstate } = waterTowerContext;
  // init bulding
  const buildingContext = useContext(BuildingContext);
  const { buildings } = buildingContext;
  // init buldingsteps
  const buildingStepsContext = useContext(BuildingStepsContext);
  const { buildingSteps } = buildingStepsContext;
  // init water tower steps userContext
  const waterTowerStepsContext = useContext(WaterTowerStepsContext);
  const { waterTowerSteps } = waterTowerStepsContext;

  // init userContext
  const userContext = useContext(UserContext);

  setInterval(() => {
    const today = new Date().toJSON().slice(0, 10);
    watertowers.map((item) => {
      if (item.endDate < today) {
        buildingContext.updateBstate(item.name, "paused");
      } else {
        buildingSteps
          .filter((st) => st.building === item.name)
          .map((steps) => {
            if (
              steps.step1.state === "outdate" ||
              steps.step1.endDate < today
            ) {
              buildingContext.updateBstate(item.name, "paused");
            } else if (
              steps.step2.state === "outdate" ||
              steps.step2.endDate < today
            ) {
              buildingContext.updateBstate(item.name, "paused");
            } else if (
              steps.step3.state === "outdate" ||
              steps.step3.endDate < today
            ) {
              buildingContext.updateBstate(item.name, "paused");
            } else if (
              steps.step4.state === "outdate" ||
              steps.step4.endDate < today
            ) {
              buildingContext.updateBstate(item.name, "paused");
            } else if (
              steps.step5.state === "outdate" ||
              steps.step5.endDate < today
            ) {
              buildingContext.updateBstate(item.name, "paused");
            } else if (
              steps.step6.state === "outdate" ||
              steps.step6.endDate < today
            ) {
              buildingContext.updateBstate(item.name, "paused");
            } else if (
              steps.step7.state === "outdate" ||
              steps.step7.endDate < today
            ) {
              buildingContext.updateBstate(item.name, "paused");
            } else if (
              steps.step8.state === "outdate" ||
              steps.step8.endDate < today
            ) {
              buildingContext.updateBstate(item.name, "paused");
            } else {
              if (steps.step8.state !== "valid") {
                updateBstate(item.name, "inProgress");
              }
            }
          });
      }
    });

    watertowers.map((item) => {
      if (item.endDate < today) {
        updateBstate(item.name, "paused");
      } else {
        waterTowerSteps
          .filter((st) => st.waterTower === item.name)
          .map((steps) => {
            if (
              steps.step1.state === "outdate" ||
              steps.step1.endDate < today
            ) {
              updateBstate(item.name, "paused");
            } else if (
              steps.step2.state === "outdate" ||
              steps.step2.endDate < today
            ) {
              updateBstate(item.name, "paused");
            } else if (
              steps.step3.state === "outdate" ||
              steps.step3.endDate < today
            ) {
              updateBstate(item.name, "paused");
            } else if (
              steps.step4.state === "outdate" ||
              steps.step4.endDate < today
            ) {
              updateBstate(item.name, "paused");
            } else if (
              steps.step5.state === "outdate" ||
              steps.step5.endDate < today
            ) {
              updateBstate(item.name, "paused");
            } else if (
              steps.step6.state === "outdate" ||
              steps.step6.endDate < today
            ) {
              updateBstate(item.name, "paused");
            } else if (
              steps.step7.state === "outdate" ||
              steps.step7.endDate < today
            ) {
              updateBstate(item.name, "paused");
            } else if (
              steps.step8.state === "outdate" ||
              steps.step8.endDate < today
            ) {
              updateBstate(item.name, "paused");
            } else if (
              steps.step9.state === "outdate" ||
              steps.step9.endDate < today
            ) {
              updateBstate(item.name, "paused");
            } else {
              if (steps.step9.state !== "valid") {
                updateBstate(item.name, "inProgress");
              }
            }
          });
      }
    });
  }, 86400000);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    userContext.logOut(user._id);
    logOut();
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            {isAuthenticated && (
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
            )}

            <div className='text-center mx-auto'>
              <Typography variant='h4' noWrap>
                PROJECT MANAGER
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        {isAuthenticated && (
          <Drawer
            variant='permanent'
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {user && user.name}
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <Link to='/' className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <HomeRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItem>
              </Link>
              <Link to='/projects' className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <AssignmentRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Projects"} />
                </ListItem>
              </Link>
              <Link to='/companies' className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <HomeWorkRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Companies"} />
                </ListItem>
              </Link>
              <Link to='/calendar' className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <EventAvailableRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Calendar"} />
                </ListItem>
              </Link>
              <Link to='/expenses' className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <MonetizationOnRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Expenses"} />
                </ListItem>
              </Link>
              <Link to='/export' className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <ImportExportIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Export"} />
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              {user && user.role === "admin" && (
                <Link to='users' className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Users"} />
                  </ListItem>
                </Link>
              )}
              <Link to='#!' className={classes.link} onClick={handleLogout}>
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItem>
              </Link>
            </List>
          </Drawer>
        )}
        <main className={classes.content}>
          <div>
            <Toaster />
          </div>
          <div
            className={classes.toolbar}
            style={{ height: "auto", width: "auto" }}
          />
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/projects' component={Project} />
            <PrivateRoute exact path='/companies' component={Companies} />
            <PrivateRoute exact path='/calendar' component={Calendar} />
            {user && <AdminRoute exact path='/users' component={User} />}
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/expenses' component={Expenses} />
            <PrivateRoute exact path='/export' component={Exporter} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
