import React, { Component, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import PrimaryHeading from '../../../../components/UI/PrimaryHeading/PrimaryHeading';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './ListaMetas.module.css';

import { api } from '../../../../services/oneelevadores';

const ListaMurais = () => {
  const [metas, setMetas] = useState([]);
  const [tokenSession, setTokenSession] = useState('');

  useEffect(() => {
    const getToken = localStorage.getItem('loginToken');

    if (getToken) {
      setTokenSession(getToken);
    }
  }, []);

  useEffect(() => {
    const getMetas = async () => {
      try {
        const response = await api.get('/goals', {
          headers: {
            Authorization: `Bearer ${tokenSession}`,
          },
        });

        setMetas(response.data);
      } catch (err) {
        console.log('erro: ', err);
      }
    };

    getMetas();
  }, [tokenSession]);

  const deleteMetaPublication = async (publicationId) => {
    try {
      await api.delete(`/goal/${publicationId}`, {
        headers: {
          Authorization: `Bearer ${tokenSession}`,
        },
      });

      const newsMetas = metas.filter((meta) => meta.id !== publicationId);

      setMetas(newsMetas);
    } catch (err) {
      console.log('erro: ', err);
    }
    //DELETANDO META => ONEELEVADORES
    // axios.delete('/murals/' + publicationId).then((res) => {
    //   const murals = [...this.state.murals];
    //   const updatedMurals = murals.filter((m) => m.id !== publicationId);
    //   this.setState({ murals: updatedMurals });
    // });
  };

  return (
    <Card className={styles.container}>
      <PrimaryHeading>Lista de Metas</PrimaryHeading>

      {metas.map((meta) => (
        <Card key={meta.id} className={styles.card}>
          <IconButton
            aria-label="delete"
            size="small"
            style={{ position: 'absolute', right: 8, top: 8 }}
            onClick={() => deleteMetaPublication(meta.id)}
          >
            <DeleteIcon style={{ color: '#F3450D' }} />
          </IconButton>
          <h2 className={styles.cardTitle}>Meta Semestral</h2>
          <p>
            <strong>Q. Elevadores:</strong> {meta.qtd_contratos}
          </p>
          <p>
            <strong>Valor:</strong> R$ {meta.meta_valor}
          </p>
        </Card>
      ))}
    </Card>
  );
};

export default ListaMurais;
