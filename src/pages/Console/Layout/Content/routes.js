import GridSelection from "../../GridSelection/GridSelection";
import MeuPerfil from "../../MeuPerfil/MeuPerfil";
import UsuariosCadastrados from "../../UsuariosCadastrados/UsuariosCadastrados";
import DetalhesUsuario from "../../UsuariosCadastrados/DetalhesUsuario/DetalhesUsuario";
import MinhaInstituicao from "../../MinhaInstituicao/MinhaInstituicao";
import MensagemInstitucional from "../../MensagemInstitucional/MensagemInstitucional";
import Biblia from "../../Biblia/Biblia";
import Hinario from "../../Hinario/Hinario";
import Mural from "../../Mural/Mural";

const routes = [
  {
    path: "/console",
    exact: true,
    component: GridSelection,
  },
  {
    path: "/console/perfil",
    exact: true,
    component: MeuPerfil,
  },
  {
    path: "/console/usuarios",
    exact: true,
    component: UsuariosCadastrados,
  },
  {
    path: "/console/usuarios/resumo",
    exact: true,
    component: DetalhesUsuario,
  },
  {
    path: "/console/minha-instituicao",
    exact: true,
    component: MinhaInstituicao,
  },
  {
    path: "/console/instituicoes/mensagem",
    exact: true,
    component: MensagemInstitucional,
  },
  {
    path: "/console/mural/upload",
    exact: true,
    component: Mural,
    type: 1,
  },
  {
    path: "/console/eventos/upload",
    exact: true,
    component: Mural,
    type: 2,
  },
  {
    path: "/console/biblia",
    exact: true,
    component: Biblia,
    type: 2,
  },
  {
    path: "/console/hinario",
    exact: true,
    component: Hinario,
    type: 2,
  },
];

export default routes;
