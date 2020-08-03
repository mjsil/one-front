import React from "react";
import { withRouter } from "react-router-dom";

import ArtTrackOutlined from "@material-ui/icons/ArtTrackOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
// import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import AssessmentIcon from "@material-ui/icons/Assessment";
import styles from "./GridSelection.module.css";

function GridSelection(props) {
  const onRedirectHandler = (path) => {
    props.history.push(props.match.path + "/" + path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.GridSelection}>
        <div
          className={styles.card}
          onClick={() => onRedirectHandler("mural/upload")}
        >
          <ArtTrackOutlined fontSize="large" className={styles.icon} />
          <h1>Mural</h1>
        </div>
        <div
          className={styles.card}
          onClick={() => onRedirectHandler("usuarios")}
        >
          <ContactsOutlinedIcon fontSize="large" className={styles.icon} />
          <h1>Usuários Cadastrados</h1>
        </div>
        {/* <div
          className={styles.card}
          onClick={() => onRedirectHandler("minha-instituicao")}
        >
          <AccountBalanceOutlinedIcon
            fontSize="large"
            className={styles.icon}
          />
          <h1>Minha Instituição</h1>
        </div> */}
        <div
          className={styles.card}
          onClick={() => onRedirectHandler("instituicoes/mensagem")}
        >
          <EmailOutlinedIcon fontSize="large" className={styles.icon} />
          <h1>Mensagem Institucional</h1>
        </div>
        <div
          className={styles.card}
          onClick={() => onRedirectHandler("relatorios")}
        >
          <AssessmentIcon fontSize="large" className={styles.icon} />
          <h1>Relatórios</h1>
        </div>
      </div>
    </div>
  );
}

export default withRouter(GridSelection);
