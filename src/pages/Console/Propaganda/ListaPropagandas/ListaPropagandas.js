import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import PrimaryHeading from "../../../../components/UI/PrimaryHeading/PrimaryHeading";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "../../../../axios-instance";

import styles from "./ListaPropagandas.module.css";

export default class ListaPropagandas extends Component {
  state = {
    ads: [],
  };

  componentDidMount() {
    axios
      .get("/propagandas")
      .then((res) => this.setState({ ...this.state, ads: res.data }));
  }

  deletePublicity = (publicityId) => {
    axios.delete("/propaganda/" + publicityId).then((res) => {
      const ads = [...this.state.ads];
      const updatedAds = ads.filter(
        (p) => p.id !== parseInt(res.data.deletedId)
      );

      this.setState({ ads: updatedAds });
    });
  };

  render() {
    const adsItems = this.state.ads.map((publicity) => (
      <Card key={publicity.id} className={styles.card}>
        <IconButton
          aria-label="delete"
          size="small"
          style={{ position: "absolute", right: 8, top: 8 }}
          onClick={() => this.deletePublicity(publicity.id)}
        >
          <DeleteIcon style={{ color: "#F3450D" }} />
        </IconButton>
        <h2 className={styles.cardTitle}>{publicity.name}</h2>
        <p>
          <strong>Nome do arquivo:</strong> {publicity.originalname}
        </p>
        <p>
          <strong>Tipo do arquivo:</strong> {publicity.mimetype}
        </p>
        <p>
          <strong>Tamanho do arquivo:</strong>{" "}
          {(publicity.size / 1000000).toFixed(2)}MB
        </p>
      </Card>
    ));
    return (
      <Card className={styles.container}>
        <PrimaryHeading>Lista de Publicações</PrimaryHeading>
        {adsItems}
      </Card>
    );
  }
}
