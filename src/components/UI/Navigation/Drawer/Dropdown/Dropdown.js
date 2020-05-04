import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    color: "#fff",
    backgroundColor: "#232A34",
    "&:hover": {
      backgroundColor: "#2C3442",
    },
  },
  dropdownIconItem: {
    color: "#fff",
  },
  listItem: {
    backgroundColor: "#18202c",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#151C26",
    },
  },
  listItemIcon: {
    color: "#fff",
  },
}));

const Dropdown = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (props.parentPath) {
      return props.history.push("/console" + props.parentPath);
    }
    setOpen(!open);
  };

  const ParentIcon = props.parentIcon;
  let childrens = null;
  let expandIcon = null;

  if (props.childrens) {
    childrens = props.childrens.map((children, index) => {
      const Icon = children.icon;
      return (
        <Link
          key={index}
          to={"/console" + children.route}
          style={{ textDecoration: "none" }}
        >
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon className={classes.dropdownIconItem} />
            </ListItemIcon>
            <ListItemText primary={children.name} />
          </ListItem>
        </Link>
      );
    });
    expandIcon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <Fragment>
      <ListItem button onClick={handleClick} className={classes.listItem}>
        <ListItemIcon className={classes.listItemIcon}>
          <ParentIcon />
        </ListItemIcon>
        <ListItemText primary={props.parentName} />
        {expandIcon}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {childrens}
        </List>
      </Collapse>
    </Fragment>
  );
};

Dropdown.propTypes = {
  parentIcon: PropTypes.object,
  childrens: PropTypes.arrayOf(PropTypes.object),
  parentName: PropTypes.string,
  history: PropTypes.object,
};

export default Dropdown;
