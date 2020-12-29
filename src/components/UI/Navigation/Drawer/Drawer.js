import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Dropdown from "./Dropdown/Dropdown";
import routes from "./metadata/routes";
import logo from "../../../../assets/Logo.png";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerContainer: {
    height: "100%",
    backgroundColor: "#18202c",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      cursor: "pointer",
    },
    backgroundColor: "#242B37",
  },
  divider: {
    backgroundColor: "#85909D",
  },
  logo: {
    width: "100%",
    maxHeight: "130px",
    margin: 10,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();

  const redirectToConsole = () => {
    props.history.push("/console");
  };

  const drawer = (
    <div className={classes.drawerContainer}>
      <div className={classes.logoContainer} onClick={redirectToConsole}>
        <img
          src={props.logoPath ? props.logoPath : logo}
          alt="Onenet"
          className={classes.logo}
        />
      </div>
      <Divider className={classes.divider} />
      {routes.map((route, index) => {
        const routeChildrens = [];

        if((route.parentName === "Relatório de Vendas") && (props.institution.id === 8 || props.institution.id === 7)){
          route = {
            ...route,
            type: [2, 4, 5]
          }
        }

        if (route.childrens) {
          route.childrens.forEach((children) => {
            if (
              children.type &&
              !children.type.includes(props.institution.type)
            ) {
              return null;
            }

            routeChildrens.push(children);
          });
        }

        if (route.type && !route.type.includes(props.institution.type)) {
          return null;
        }

        return (
          <Dropdown
            key={index}
            {...props}
            parentName={route.parentName}
            parentPath={route.parentPath}
            parentIcon={route.parentIcon}
            childrens={routeChildrens}
          />
        );
      })}
    </div>
  );

  return (
    <Fragment>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={props.mobileOpen}
            onClose={props.toggleDrawer}
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
    </Fragment>
  );
}

ResponsiveDrawer.propTypes = {
  institution: PropTypes.object,
  mobileOpen: PropTypes.bool,
  toggleDrawer: PropTypes.func,
};

export default withRouter(ResponsiveDrawer);
