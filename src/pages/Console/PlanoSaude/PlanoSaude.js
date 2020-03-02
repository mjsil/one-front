import React, { Fragment, Component } from 'react';

import axios from '../../../axios-instance';
import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import StickyHeadTable from '../../../components/Table/StickyHeadTable';
import styles from './PlanoSaude.module.css';

const columns = [
  { id: 'nome_cliente', label: 'Cliente', minWidth: 60 },
  { id: 'data_venda', label: 'Venda', minWidth: 60 },
  { id: 'data_limite_pagamento', label: 'Limite Pagamento', minWidth: 60 },
  { id: 'pago', label: 'Pago', minWidth: 60 },
  { id: 'vencido', label: 'Vencido', minWidth: 60 },
  { id: 'valor_venda', label: 'Valor venda', minWidth: 60 },
  { id: 'identificador', label: 'Identificador', minWidth: 60 },
  { id: 'data_do_credito', label: 'Data do Crédito', minWidth: 60 }
];

class PlanoSaude extends Component {
  state = {
    rows: []
  }

  componentDidMount() {
    axios
      .get('/venda')
      .then((res) => {
        const vendas = res.data.map((venda) => {
          return {
            ...venda,
            pago: venda.pago ? 'Sim' : 'Não',
            retirado: venda.retirado ? 'Sim' : 'Não',
            vencido: venda.vencido ? 'Sim' : 'Não',
            ja_foi_pago: venda.ja_foi_pago ? 'Sim' : 'Não',
            valor_venda: venda.valor_venda.toFixed(2)
          }
        });
        return vendas;
      })
      .then(vendas => {
        this.setState({ rows: vendas })
      });
  }

  render() {
    return (
      <Fragment>
        <PrimaryHeading>Plano de Saúde</PrimaryHeading>
        <div className={styles.container}>
          <StickyHeadTable
            columns={columns}
            rows={this.state.rows} />
        </div>
      </Fragment>
    );
  }
}

export default PlanoSaude;