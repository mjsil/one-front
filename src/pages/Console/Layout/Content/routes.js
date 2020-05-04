import GridSelection from "../../GridSelection/GridSelection";
import MeuPerfil from "../../MeuPerfil/MeuPerfil";
import UsuariosCadastrados from "../../UsuariosCadastrados/UsuariosCadastrados";
import MinhaInstituicao from "../../MinhaInstituicao/MinhaInstituicao";
import MensagemInstitucional from "../../MensagemInstitucional/MensagemInstitucional";
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
  },
];

export default routes;
