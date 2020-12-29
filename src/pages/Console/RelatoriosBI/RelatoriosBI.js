import React, { Component } from "react";
import LayoutContext from "../Layout/Layout-context";
import Iframe from "react-iframe";
import institutions from "./institutions-metadata";

class RelatorioasBI extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  static contextType = LayoutContext;

  componentDidMount() {
    this.updateWindowDimensions();

    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const iframeHeight = this.state.height - this.state.height * 0.15;

    let iframeUrl = "https://www.jumaconsultoria.com/";

    const fetchedInstitution = institutions.find(
      (inst) => inst.institution_id === this.context.institution.id
    );

    if (fetchedInstitution && this.state.height !== 0) {
      iframeUrl = `https://www.jumatech.com.br/login?username=${fetchedInstitution.username}&token=${fetchedInstitution.token}`;
    }

    return (
      <React.Fragment>
        <Iframe
          url={iframeUrl}
          width="100%"
          height={iframeHeight}
          id="iframe-juma-id"
          display="initial"
          position="relative"
        />
      </React.Fragment>
    );
  }
}

export default RelatorioasBI;
