import React from 'react';

import GetAppIcon from '@material-ui/icons/GetApp';
import styles from './CustomTable.module.css';

const CustomTable = (props) => {
  return (
    <div className={styles.table}>
      <div className={styles.labelContainer}>
        <label>Data de Saque</label>
      </div>

      {props.rows.map(row => (
        <div key={row.id} className={styles.row}>
          <div>{row.data_de_saque}</div>
          <button
            className={styles.icon} 
            onClick={() => props.onClickDownload(row.id)}
          >
            <GetAppIcon />
          </button>
        </div>
      ))}
    </div>
  );
}

export default CustomTable;