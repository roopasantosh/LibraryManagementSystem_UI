import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AccountCircle,
  Dashboard,
  ExitToApp,
  ListAlt,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { clearToken, decodeToken } from "../../helpers/utility";
import logo from "../../images/logo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: 9999,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingTop: 0,
  },
}));

function ResponsiveDrawer(props) {
  const navigate = useNavigate();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const decodedtoken = decodeToken();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Hidden mdDown implementation="css">
        <Typography variant="h6" noWrap className="text-center">
          <img src={logo} height={96} className="mt-2" />
        </Typography>
      </Hidden>
      <Hidden smUp implementation="css">
        <div className={classes.toolbar} />
      </Hidden>
      <List disablePadding className="ml-4">
        <ListItem
          disableGutters
          className="py-1"
          button
          onClick={() => navigate("/")}
        >
          <ListItemIcon className="minwidth-unset mr-2">
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem
          disableGutters
          className="py-1"
          button
          onClick={() => navigate("/profile")}
        >
          <ListItemIcon className="minwidth-unset mr-2">
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
        {decodedtoken && decodedtoken.role == "Admin" && (
          <ListItem
            disableGutters
            className="py-1"
            button
            onClick={() => navigate("/signup")}
          >
            <ListItemIcon className="minwidth-unset mr-2">
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary={"Create User"} />
          </ListItem>
        )}
        {decodedtoken && decodedtoken.role == "Admin" && (
          <ListItem
            disableGutters
            className="py-1"
            button
            onClick={() => navigate("/transactions")}
          >
            <ListItemIcon className="minwidth-unset mr-2">
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary={"Book Transactions"} />
          </ListItem>
        )}
        <ListItem
          disableGutters
          className="py-1"
          button
          onClick={() => {
            clearToken();
          }}
        >
          <ListItemIcon className="minwidth-unset mr-2">
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Hidden smUp implementation="css">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} height={40} />
            &nbsp;
            <h3 className="m-0 p-0">LMS PRO</h3>
          </Toolbar>
        </AppBar>
      </Hidden>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Hidden smUp implementation="css">
          <div className={classes.toolbar} />
        </Hidden>
        {props.children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
