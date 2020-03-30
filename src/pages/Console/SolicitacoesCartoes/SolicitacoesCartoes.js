import React, { Component, Fragment } from "react";

import axios from "../../../axios-instance";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import OverwrittenTable from "../../../components/Table/OverwrittenTable/OverwrittenTable";

const COLUMNS = [
  "Nome Completo",
  "Nascimento",
  "CPF",
  "Matrícula",
  "E-mail",
  "DDD",
  "Celular"
];

const EXTRACT_DATA_FROM_ROWS = [
  "nome_completo",
  "data_nascimento",
  "cpf",
  "matricula",
  "email",
  "ddd_telefone_celular",
  "telefone_celular"
];

class SolicitacoesCartoes extends Component {
  state = {
    solicitacoes: []
  };

  componentDidMount() {
    axios.get("/solicitacaocartao").then(res => {
      this.setState({ solicitacoes: res.data });
    });
  }

  onDownloadSolicitacoesHandler = (solicitacaoId, fileDate) => {
    axios({
      url: "/downloadsolicitacaocartao",
      method: "GET",
      responseType: "blob"
    }).then(response => {
      const currentDate = new Date().toLocaleDateString();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `data_de_saque-${currentDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
    });
  };

  render() {
    return (
      <Fragment>
        <PrimaryHeading>Solicitações de Cartões</PrimaryHeading>
        <OverwrittenTable
          rows={this.state.solicitacoes}
          columns={COLUMNS}
          extractFromRows={EXTRACT_DATA_FROM_ROWS}
          onClickDownload={this.onDownloadSolicitacoesHandler}
        />
      </Fragment>
    );
  }
}

export default SolicitacoesCartoes;
