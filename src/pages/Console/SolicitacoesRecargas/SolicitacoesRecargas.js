import React, { Component, Fragment } from "react";

import axios from "../../../axios-instance";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import OverwrittenTable from "../../../components/Table/OverwrittenTable/OverwrittenTable";

const COLUMNS = ["Número de Série", "CPF", "Valor da Recarga", "Observação"];

const EXTRACT_DATA_FROM_ROWS = [
  "numero_de_serie",
  "cpf",
  "valor_da_recarga",
  "observacao"
];

class SolicitacoesCartoes extends Component {
  state = {
    solicitacoes: []
  };

  componentDidMount() {
    axios.get("/solicitacaorecarga").then(res => {
      this.setState({ solicitacoes: res.data });
    });
  }

  onDownloadSolicitacoesHandler = (solicitacaoId, fileDate) => {
    axios({
      url: "/downloadsolicitarecarga",
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
        <PrimaryHeading>Solicitações de Recargas</PrimaryHeading>
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
