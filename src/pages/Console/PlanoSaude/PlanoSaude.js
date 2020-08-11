import React, { Component, Fragment } from "react";
import Iframe from "react-iframe";
import {
  serverInstance,
  clientInstance,
} from "../../../services/axios-plano-saude";

class RelatorioasBI extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, iframeUrl: null };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();

    window.addEventListener("resize", this.updateWindowDimensions);

    if (!this.state.iframeUrl) {
      const dataToPost = {
        email: "vendedor@email.com",
        password: "vendedor",
      };

      serverInstance.post("api/user/login", dataToPost).then((res) => {
        this.setState({
          iframeUrl:
            clientInstance.defaults.baseURL + "/?access_token=" + res.data.id,
        });
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const iframeHeight = this.state.height - this.state.height * 0.15;

    let iframe;
    if (this.state.iframeUrl) {
      iframe = (
        <Iframe
          url={this.state.iframeUrl}
          width="100%"
          height={iframeHeight}
          id="iframe-saude"
          display="initial"
          position="relative"
        />
      );
    }

    return <Fragment>{iframe}</Fragment>;
  }
}

export default RelatorioasBI;
