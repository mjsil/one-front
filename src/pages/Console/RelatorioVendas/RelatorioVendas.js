import React, { Component, Fragment } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import StickyHeadTable from "../../../components/Table/StickyHeadTable";
import axios from "../../../axios-instance";

import styles from "./RelatorioVendas.module.css";

const columns = [
  { id: "product_name", label: "Produto" },
  { id: "seller_name", label: "Vendedor" },
  { id: "client_name", label: "Cliente" },
  { id: "paid", label: "Pago?" },
  { id: "seller_amount", label: "Vendedor" },
  { id: "institution_amount", label: "Instituição" },
  { id: "withdraw_date", label: "Saque" },
  { id: "not_available_until", label: "Disponível Em" },
];

class RelatorioVendas extends Component {
  state = {
    sales: [],
    totalInstitution: 0,
    totalSellers: 0,
    awardValue: 0,
    loading: false,
    errorMessage: null,
  };

  componentDidMount() {
    axios.get("/premiacao").then((res) => {
      let totalInstitution = 0;
      let totalSellers = 0;
      const awardValue = res.data.userAmount;
      const sales = res.data.awardsDetails.map((sale) => {
        totalInstitution += sale.institution_amount;
        totalSellers += sale.seller_amount;

        return {
          ...sale,
          id: sale.sale_id,
          paid: sale.paid ? "Sim" : "Não",
          seller_amount: this.handleAmountFormat(sale.seller_amount),
          institution_amount: this.handleAmountFormat(sale.institution_amount),
          withdraw_date: this.handleDateFormat(sale.withdraw_date),
          not_available_until: this.handleDateFormat(sale.not_available_until),
        };
      });

      this.setState({
        sales,
        awardValue,
        totalInstitution,
        totalSellers,
      });
    });
  }

  handleAmountFormat = (amount) => {
    return amount || amount === 0
      ? "R$" + amount.toFixed(2).toString().replace(".", ",")
      : null;
  };

  handleDateFormat = (date) => {
    return date ? new Date(date).toLocaleDateString("pt-br") : null;
  };

  onFormSubmitHandler = () => {
    this.setState({ loading: true, errorMessage: null });

    if (this.state.awardValue < 20) {
      return this.setState({
        errorMessage: "O valor mínimo para saque é R$20,00.",
        loading: false,
      });
    }

    axios
      .post("/premiacao/saque/instituicao")
      .then((res) => {
        this.props.openSnackbar(
          "Saque realizado com sucesso! Dentro de 14 dias úteis o saldo será depositado em seu cartão."
        );
        this.props.history.replace("/console");
      })
      .catch((err) => {
        this.setState({ loading: false });
        if (err.response) {
          if (err.response.data) {
            this.setState({ errorMessage: err.response.data.error });
          }
        }
      });
  };

  render() {
    let errorAlert;
    if (this.state.errorMessage) {
      errorAlert = (
        <div className={styles.errorHolder}>
          <Alert severity="error">{this.state.errorMessage}</Alert>
        </div>
      );
    }

    let loadingProgress;
    if (this.state.loading) {
      loadingProgress = (
        <div className={styles.loadingHolder}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <Fragment>
        <PrimaryHeading>Relatório de Vendas</PrimaryHeading>
        <Card className={styles.card}>
          <div className={styles.cardTextHolder}>
            <p>
              Total Vendendor:{" "}
              {this.handleAmountFormat(this.state.totalSellers)}
            </p>
            <p>
              Total Instituição:{" "}
              {this.handleAmountFormat(this.state.totalInstitution)}
            </p>
            <p>
              Disponível para saque:{" "}
              {this.handleAmountFormat(this.state.awardValue)}
            </p>
          </div>
          <div className={styles.buttonHolder}>
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.loading}
              onClick={this.onFormSubmitHandler}
            >
              Efetuar Saque
            </Button>
            {errorAlert}
            {loadingProgress}
          </div>
        </Card>
        <StickyHeadTable columns={columns} rows={this.state.sales} />
      </Fragment>
    );
  }
}

export default RelatorioVendas;
