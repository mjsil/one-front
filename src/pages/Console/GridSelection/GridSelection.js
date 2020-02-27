import React from 'react';
import { withRouter } from 'react-router-dom';

import PersonIcon from '@material-ui/icons/Person';
import ArtTrackOutlinedIcon from '@material-ui/icons/ArtTrackOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import CropRotateOutlinedIcon from '@material-ui/icons/CropRotateOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

import styles from './GridSelection.module.css';

function GridSelection(props) {
  const onRedirectHandler = (path) => {
    props.history.push(props.match.path + '/' + path);
  }

  return (
    <div className={styles.container}>
      <div className={styles.GridSelection}>
        <div className={styles.card} onClick={() => onRedirectHandler('perfil')}>
          <PersonIcon fontSize="large" className={styles.icon} />
          <h1>Meu Perfil</h1>
        </div>
        <div className={styles.card} onClick={() => onRedirectHandler('mural')}>
          <ArtTrackOutlinedIcon fontSize="large" className={styles.icon} />
          <h1>Mural</h1>
        </div>
        <div className={styles.card} onClick={() => onRedirectHandler('plano-saude')}>
          <AddShoppingCartOutlinedIcon fontSize="large" className={styles.icon} />
          <h1>Plano de Saúde</h1>
        </div>
        <div className={styles.card} onClick={() => onRedirectHandler('recargas')}>
          <CropRotateOutlinedIcon fontSize="large" className={styles.icon} />
          <h1>Recargas</h1>
        </div>
        <div className={styles.card} onClick={() => onRedirectHandler('marketplace/produtos')}>
          <LocalMallOutlinedIcon fontSize="large" className={styles.icon} />
          <h1>Produtos</h1>
        </div>
        <div className={styles.card} onClick={() => onRedirectHandler('termos')}>
          <CreateOutlinedIcon fontSize="large" className={styles.icon} />
          <h1>Termos</h1>
        </div>
      </div>
    </div>
  );
}

export default withRouter(GridSelection);