import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import PrimaryHeading from "../../../../components/UI/PrimaryHeading/PrimaryHeading";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./ListaMurais.module.css";
import axios from "../../../../axios-instance";

export default class ListaMurais extends Component {
  state = {
    murals: [],
  };

  componentDidMount() {
    axios
      .get("/murals/" + this.props.institutionId)
      .then((res) => this.setState({ ...this.state, murals: res.data }));
  }

  deleteMuralPublication = (publicationId) => {
    axios.delete("/murals/" + publicationId).then((res) => {
      const murals = [...this.state.murals];
      const updatedMurals = murals.filter((m) => m.id !== publicationId);
      this.setState({ murals: updatedMurals });
    });
  };

  render() {
    const muralsItems = this.state.murals.map((mural) => (
      <Card key={mural.id} className={styles.card}>
        <IconButton
          aria-label="delete"
          size="small"
          style={{ position: "absolute", right: 8, top: 8 }}
          onClick={() => this.deleteMuralPublication(mural.id)}
        >
          <DeleteIcon style={{ color: "#F3450D" }} />
        </IconButton>
        <h2 className={styles.cardTitle}>{mural.eventname}</h2>
        <p>
          <strong>Descrição:</strong> {mural.eventdescription}
        </p>
        <p>
          <strong>Nome do arquivo:</strong> {mural.originalname}
        </p>
        <p>
          <strong>Tipo do arquivo:</strong> {mural.mimetype}
        </p>
        <p>
          <strong>Tamanho do arquivo:</strong>{" "}
          {(mural.size / 1000000).toFixed(2)}MB
        </p>
      </Card>
    ));
    return (
      <Card className={styles.container}>
        <PrimaryHeading>Lista de Publicações</PrimaryHeading>
        {muralsItems}
      </Card>
    );
  }
}
