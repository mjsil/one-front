import React, { Component, Fragment } from 'react';

import axios from '../../../axios-instance';
import StickyHeadTable from '../../../components/Table/StickyHeadTable';
import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import styles from './ProdutosCadastrados.module.css';

const columns = [
  { id: 'nome_produto', label: 'Produto', minWidth: 60 },
  { id: 'valor_produto', label: 'Valor', minWidth: 60 },
  { id: 'local', label: 'Local', minWidth: 60 },
  { id: 'data_cancelamento', label: 'Cancelamento', minWidth: 60 },
  { id: 'percentual_retorno', label: 'Retorno (%)', minWidth: 60 },
  { id: 'percentual_vendedor', label: 'Vendedor (%)', minWidth: 60 },
  { id: 'percentual_instituicao', label: 'Instituição (%)', minWidth: 60 },
  { id: 'percentual_1net', label: 'onenet (%)', minWidth: 60 },
  { id: 'id_instituicao', label: 'ID Instituição', minWidth: 60 }
];

class ProdutosCadastrados extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    axios
      .get('/products')
      .then((res) => {
        const products = [...res.data];

        return products.map(p => {
          const product = { ...p };
          for (let key in product) {
            if (Array.isArray(product[key])) {
              product[key] = product[key].join(', ');
            }
          }
          return product;
        });
      })
      .then((products) => {
        this.setState({ products: products });
      });
  }

  render() {
    return (
      <Fragment>
        <PrimaryHeading>Produtos</PrimaryHeading>
        <div className={styles.container}>
          <StickyHeadTable
            columns={columns}
            rows={this.state.products} />
        </div>
      </Fragment>
    );
  }
}

export default ProdutosCadastrados;