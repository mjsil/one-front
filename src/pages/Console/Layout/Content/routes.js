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
import GridSelection from '../../GridSelection/GridSelection';

const routes = [
  {
    path: '/console',
    exact: true,
    component: GridSelection
  },
  {
    path: '/console/perfil',
    exact: true,
    component: MeuPerfil
  },
  {
    path: '/console/usuarios',
    exact: true,
    component: UsuariosCadastrados
  },
  {
    path: '/console/grupos-chat',
    exact: true,
    component: GruposChat
  },
  {
    path: '/console/novo-usuario',
    exact: true,
    component: NovoUsuario
  },
  {
    path: '/console/nova-instituicao',
    exact: true,
    component: NovaInstituicaoUsuarios
  },
  {
    path: '/console/nova-instituicao/form',
    exact: true,
    component: NovaInstituicaoForm
  },
  {
    path: '/console/minha-instituicao',
    exact: true,
    component: MinhaInstituicao
  },
  {
    path: '/console/premiacoes',
    exact: true,
    component: Premiacoes
  },
  {
    path: '/console/plano-saude',
    exact: true,
    component: PlanoSaude
  },
  {
    path: '/console/marketplace/novo-produto',
    exact: true,
    component: CriarProdutoInstituicoes
  },
  {
    path: '/console/marketplace/produtos',
    exact: true,
    component: ProdutosCadastrados
  },
  {
    path: '/console/instituicoes/mensagem',
    exact: true,
    component: MensagemInstitucional
  }
];

export default routes;
