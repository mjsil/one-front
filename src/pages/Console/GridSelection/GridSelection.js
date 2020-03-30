import React from "react";
import { withRouter } from "react-router-dom";

import PersonIcon from "@material-ui/icons/Person";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import styles from "./GridSelection.module.css";

function GridSelection(props) {
  const onRedirectHandler = path => {
    props.history.push(props.match.path + "/" + path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.GridSelection}>
        <div
          className={styles.card}
          onClick={() => onRedirectHandler("perfil")}
        >
          <PersonIcon fontSize="large" className={styles.icon} />
          <h1>Meu Perfil</h1>
        </div>
        <div
          className={styles.card}
          onClick={() => onRedirectHandler("usuarios")}
        >
          <ContactsOutlinedIcon fontSize="large" className={styles.icon} />
          <h1>Usuários Cadastrados</h1>
        </div>
        <div
          className={styles.card}
          onClick={() => onRedirectHandler("minha-instituicao")}
        >
          <AccountBalanceOutlinedIcon
            fontSize="large"
            className={styles.icon}
          />
          <h1>Minha Instituição</h1>
        </div>
        <div
          className={styles.card}
          onClick={() => onRedirectHandler("instituicoes/mensagem")}
        >
          <EmailOutlinedIcon fontSize="large" className={styles.icon} />
          <h1>Mensagem Institucional</h1>
        </div>
      </div>
    </div>
  );
}

export default withRouter(GridSelection);
