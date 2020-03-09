import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import MeuPerfil from '../../MeuPerfil/MeuPerfil';
import NovoUsuario from '../../NovoUsuario/NovoUsuario';
import UsuariosCadastrados from '../../UsuariosCadastrados/UsuariosCadastrados';
import GruposChat from '../../GruposChat/GruposChat';
import MinhaInstituicao from '../../MinhaInstituicao/MinhaInstituicao';
import NovaInstituicaoUsuarios from '../../NovaInstituicao/ListaUsuarios/ListaUsuarios';
import NovaInstituicaoForm from '../../NovaInstituicao/Form/NovaInstituicao';
import CriarProdutoInstituicoes from '../../CriarProduto/CriarProduto';
import ProdutosCadastrados from '../../ProdutosCadastrados/ProdutosCadastrados';
import Premiacoes from '../../Premiacoes/Premiacoes';
import PlanoSaude from '../../PlanoSaude/PlanoSaude';
import MensagemInstitucional from '../../MensagemInstitucional/MensagemInstitucional';
import AppBar from '../../../../components/UI/Navigation/AppBar/AppBar';
import Drawer from '../../../../components/UI/Navigation/Drawer/Drawer';
import GridSelection from '../../GridSelection/GridSelection';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Content(props) {
  const { container } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: ''
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbar({
      isOpen: true,
      message: message
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      isOpen: false,
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        onLogout={props.onLogout}
        institutionName={props.institution.name}
        toggleDrawer={handleDrawerToggle} />
      <Drawer
        container={container}
        mobileOpen={mobileOpen}
        toggleDrawer={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/console" exact component={GridSelection} />
          <Route
            path="/console/perfil"
            exact
            component={() => <MeuPerfil {...props} openSnackbar={handleSnackbarOpen} />} />
          <Route path="/console/usuarios" exact component={UsuariosCadastrados} />
          <Route path="/console/grupos-chat" exact component={GruposChat} />
          <Route 
            path="/console/novo-usuario" 
            exact 
            component={() => <NovoUsuario {...props} openSnackbar={handleSnackbarOpen} />} />
          <Route path="/console/nova-instituicao" exact component={NovaInstituicaoUsuarios} />
          <Route 
            path="/console/minha-instituicao" 
            exact 
            component={() => <MinhaInstituicao {...props} openSnackbar={handleSnackbarOpen} />} />
          <Route path="/console/nova-instituicao/form" exact component={NovaInstituicaoForm} />
          <Route path="/console/premiacoes" exact component={Premiacoes} />
          <Route path="/console/plano-saude" exact component={PlanoSaude} />
          <Route path="/console/marketplace/novo-produto" exact component={CriarProdutoInstituicoes} />
          <Route path="/console/marketplace/produtos" exact component={ProdutosCadastrados} />
          <Route
            path="/console/instituicoes/mensagem"
            exact
            component={() => (
              <MensagemInstitucional {...props} openSnackbar={handleSnackbarOpen} />
            )} />
        </Switch>
        <Snackbar
          open={snackbar.isOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
}

export default withRouter(Content);