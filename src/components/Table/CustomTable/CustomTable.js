import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
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
          <div>{new Date(row.data_de_saque).toLocaleString()}</div>
          <Tooltip title="Download">
            <IconButton aria-label="download" onClick={() => props.onClickDownload(row.id)}>
              <GetAppIcon />
            </IconButton>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}

export default CustomTable;