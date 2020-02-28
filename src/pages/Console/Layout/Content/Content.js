import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import NovaInstituicaoUsuarios from '../../NovaInstituicao/ListaUsuarios/ListaUsuarios';
import NovaInstituicaoForm from '../../NovaInstituicao/Form/NovaInstituicao';
import CriarProdutoInstituicoes from '../../CriarProduto/ListaInstituicoes/ListaInstituicoes';
import Premiacoes from '../../Premiacoes/Premiacoes';
import PlanoSaude from '../../PlanoSaude/PlanoSaude';
import Navbar from '../../../../components/UI/Navigation/Navbar/Navbar';
import Drawer from '../../../../components/UI/Navigation/Drawer/Drawer';
import GridSelection from '../../GridSelection/GridSelection';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Content(props) {
  const { container } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        {...props}
        toggleDrawer={handleDrawerToggle} />
      <Drawer
        container={container}
        mobileOpen={mobileOpen}
        toggleDrawer={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/console" exact component={GridSelection} />
          <Route path="/console/perfil" exact render={() => <h1>Meu Perfil</h1>} />
          <Route path="/console/nova-instituicao" exact component={NovaInstituicaoUsuarios} />
          <Route path="/console/nova-instituicao/form" exact component={NovaInstituicaoForm} />
          <Route path="/console/premiacoes" exact component={Premiacoes} />
          <Route path="/console/plano-saude" exact component={PlanoSaude} />
          <Route path="/console/recargas" exact render={() => <h1>Recargas</h1>} />
          <Route path="/console/marketplace/novo-produto" exact component={CriarProdutoInstituicoes} />
          <Route path="/console/termos" exact render={() => <h1>Termos</h1>} />
        </Switch>
      </main>
    </div>
  );
}

export default Content;