import React, { Component, Fragment } from "react";
import Iframe from "react-iframe";
import {
  serverInstance,
  clientInstance,
} from "../../../services/axios-plano-saude";
import LayoutContext from '../Layout/Layout-context';

class IframeSaude extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, iframeUrl: null };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  static contextType = LayoutContext;

  componentDidMount() {
    this.updateWindowDimensions();

    window.addEventListener("resize", this.updateWindowDimensions);

    let mainUrl = this.props.location.pathname.split("/")[3] || "";
    if (mainUrl) {
      mainUrl = "/" + mainUrl;
    }

    if (!this.state.iframeUrl) {
      let dataToPost;

      switch (this.context.institution.id) {
        case 8:
          dataToPost = {
            email: "operadorcg@email.com",
            password: "123456",
          }
          break;

        case 7:
            dataToPost = {
              email: "operadorjp@email.com",
              password: "123456",
            }
            break;
  
        default:
          dataToPost = {
            email: "operador@email.com",
            password: "operador",
          };
          break;
      }

      serverInstance.post("api/user/login", dataToPost).then((res) => {
        this.setState({
          iframeUrl:
            clientInstance.defaults.baseURL +
            mainUrl +
            "/?access_token=" +
            res.data.id +
            "&&header=false",
        });
      }).catch(err => console.log(err));
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

export default IframeSaude;
