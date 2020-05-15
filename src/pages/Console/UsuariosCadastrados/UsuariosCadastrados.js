import React, { Fragment, Component } from "react";

import StickyHeadTable from "../../../components/Table/OverwrittenTable/OverwrittenTable";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import axios from "../../../axios-instance";
import styles from "./UsuariosCadastrados.module.css";

const columnsName = [
  "Nome",
  "E-mail",
  "Telefone",
  "CPF",
  "CEP",
  "Cadastrado Em",
];

const extract_data_from_rows = [
  "name",
  "email",
  "phone",
  "cpf",
  "cep",
  "createdAt",
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

  onClickedRowHandler = (row) => {
    this.props.history.push({
      pathname: this.props.location.pathname + "/resumo",
      state: row,
    });
  };

  render() {
    return (
      <Fragment>
        <PrimaryHeading>Usuários Cadastrados</PrimaryHeading>
        <div className={styles.tableContainer}>
          <StickyHeadTable
            columns={columnsName}
            rows={this.state.rows}
            extractFromRows={extract_data_from_rows}
            onClickedRow={this.onClickedRowHandler}
            icon={<EditIcon color="primary" />}
            iconTitle="Editar"
          />
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
