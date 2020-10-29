import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import PrimaryHeading from "../../../../components/UI/PrimaryHeading/PrimaryHeading";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./ListaGanhos.module.css";
import axios from "../../../../axios-instance";

export default class ListaGanhos extends Component {
  state = {
    ganhos: [],
  };

  componentDidMount() {
    axios
      .get("/ganhos/" + this.props.institutionId)
      .then((res) => this.setState({ ...this.state, ganhos: res.data }));
  }

  deleteGanhosPublication = (publicationId) => {
    axios.delete("/ganhos/" + publicationId).then((res) => {
      const ganhos = [...this.state.ganhos];
      const updatedGanhos = ganhos.filter((m) => m.id !== publicationId);
      this.setState({ ganhos: updatedGanhos });
    });
  };

  render() {
    const ganhosItems = this.state.ganhos.map((ganho) => (
      <Card key={ganho.id} className={styles.card}>
        <IconButton
          aria-label="delete"
          size="small"
          style={{ position: "absolute", right: 8, top: 8 }}
          onClick={() => this.deleteGanhosPublication(ganho.id)}
        >
          <DeleteIcon style={{ color: "#F3450D" }} />
        </IconButton>
        <h2 className={styles.cardTitle}>{ganho.eventname}</h2>
        <p>
          <strong>Nome do arquivo:</strong> {ganho.originalname}
        </p>
        <p>
          <strong>Tipo do arquivo:</strong> {ganho.mimetype}
        </p>
        <p>
          <strong>Tamanho do arquivo:</strong>{" "}
          {(ganho.size / 1000000).toFixed(2)}MB
        </p>
      </Card>
    ));
    return (
      <Card className={styles.container}>
        <PrimaryHeading>Lista de Publicações</PrimaryHeading>
        {ganhosItems}
      </Card>
    );
  }
}
