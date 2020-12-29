import React, { useContext } from "react";
import { withRouter } from "react-router-dom";

import LayoutContext from "../Layout/Layout-context";
import styles from "./GridSelection.module.css";
import routes from "./metadata/routes";

function GridSelection(props) {
  const context = useContext(LayoutContext);

  const onRedirectHandler = (path) => {
    props.history.push(props.match.path + path);
  };

  const renderedCards = routes.map((route) => {
    if((route.name === "Relatório de Vendas") && (context.institution.id === 8 || context.institution.id === 7)){
      route = {
        ...route,
        type: [2, 4, 5]
      }
    }

    if (route.type && !route.type.includes(context.institution.type)) {
      return null;
    }

    const Icon = route.icon;

    return (
      <div
        className={styles.card}
        onClick={() => onRedirectHandler(route.path)}
        key={route.path}
      >
        <Icon className={styles.icon} />
        <h1>{route.name}</h1>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.GridSelection}>{renderedCards}</div>
    </div>
  );
}

export default withRouter(GridSelection);
