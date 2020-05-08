import React, { Fragment, Component } from "react";

import StickyHeadTable from "../../../components/Table/StickyHeadTable";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import axios from "../../../axios-instance";
import styles from "./UsuariosCadastrados.module.css";

const columns = [
  { id: "name", label: "Usuário", minWidth: 60 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "phone", label: "Telefone", minWidth: 60 },
  { id: "cpf", label: "CPF", minWidth: 60 },
  { id: "cep", label: "CEP", minWidth: 60 },
  { id: "createdAt", label: "Cadastrado em", minWidth: 60 },
];

class UsuariosCadastrados extends Component {
  state = {
    rows: [],
  };

  componentDidMount() {
    axios.get("/users").then((res) => {
      const users = res.data.map((user) => {
        const userCreatedAt = new Date(user.createdAt).toLocaleDateString();
        return { ...user, createdAt: userCreatedAt };
      });
      this.setState({ rows: users });
    });
  }

  onDowloadUsersReports = () => {
    axios({
      url: `/reports/users`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const currentDate = new Date().toLocaleDateString();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `usuarios-cadastrados-${currentDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
    });
  };

  render() {
    return (
      <Fragment>
        <PrimaryHeading>Usuários Cadastrados</PrimaryHeading>
        <div className={styles.tableContainer}>
          <StickyHeadTable columns={columns} rows={this.state.rows} />
        </div>
        <Button
          onClick={this.onDowloadUsersReports}
          className={styles.downloadButton}
          disableRipple
          disableElevation
          disableFocusRipple
          startIcon={<GetAppIcon />}
        >
          Exportar Tabela
        </Button>
      </Fragment>
    );
  }
}

export default UsuariosCadastrados;
