import React, { Component } from "react";
import ContextAPI from "./Layout-context";
import axios from "../../../axios-instance";
import { getToken, removeToken } from "../../../services/institution-token";
import { logout } from "../../../services/auth";

import Content from "./Content/Content";
import styles from "./Layout.module.css";

class Layout extends Component {
  state = {
    institution: null,
  };

  componentDidMount() {
    const institutionToken = getToken();

    if (!institutionToken) {
      return this.props.history.replace("/");
    }

    axios
      .get("/institutions/" + institutionToken.id)
      .then((res) => {
        if (res.data.error) {
          return this.onLogoutHandler();
        }
        this.setState({ institution: res.data });
      })
      .catch((err) => {
        this.onLogoutHandler();
      });
  }

  onLogoutHandler = async () => {
    await removeToken();
    await logout();
    return this.props.history.replace("/");
  };

  changeInstitutionData = (newInstitution) => {
    this.setState({ institution: newInstitution });
  };

  render() {
    let contentToRender = null;

    if (this.state.institution) {
      contentToRender = (
        <ContextAPI.Provider
          value={{
            institution: this.state.institution,
            changeInstitutionData: this.changeInstitutionData,
            onLogout: this.onLogoutHandler,
          }}
        >
          <Content />
        </ContextAPI.Provider>
      );
    }
    return <section className={styles.Layout}>{contentToRender}</section>;
  }
}

export default Layout;
