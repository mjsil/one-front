import React, { Component } from "react";
import Iframe from "react-iframe";

class RelatorioasBI extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

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

    return (
      <React.Fragment>
        <Iframe
          url="http://134.209.167.35"
          width="100%"
          height={iframeHeight}
          id="iframe-saude"
          display="initial"
          position="relative"
        />
      </React.Fragment>
    );
  }
}

export default RelatorioasBI;
