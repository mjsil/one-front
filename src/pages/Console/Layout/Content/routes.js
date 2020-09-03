import GridSelection from "../../GridSelection/GridSelection";
import MeuPerfil from "../../MeuPerfil/MeuPerfil";
import UsuariosCadastrados from "../../UsuariosCadastrados/UsuariosCadastrados";
import DetalhesUsuario from "../../UsuariosCadastrados/DetalhesUsuario/DetalhesUsuario";
import MinhaInstituicao from "../../MinhaInstituicao/MinhaInstituicao";
import MensagemInstitucional from "../../MensagemInstitucional/MensagemInstitucional";
import Localizacao from "../../Localizacao/Localizacao";
import Biblia from "../../Biblia/Biblia";
import Hinario from "../../Hinario/Hinario";
import GruposChat from "../../GruposChat/GruposChat";
import Mural from "../../Mural/Mural";
import Midias from "../../Midias/Midias";
import MidiaDetails from "../../Midias/MidiaDetails/MidiaDetails";
import Propaganda from "../../Propaganda/Propaganda";
import RelatoriosBI from "../../RelatoriosBI/RelatoriosBI";
import IframeSaude from "../../IframeSaude/IframeSaude";
import RelatorioVendas from "../../RelatorioVendas/RelatorioVendas";
// import Cartao from "../../Cartao/Cartao";

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
    path: "/console/instituicoes/localizacao",
    exact: true,
    component: Localizacao,
    type: [1, 2],
  },
  {
    path: "/console/propaganda/upload",
    exact: true,
    component: Propaganda,
  },
  {
    path: "/console/mural/upload",
    exact: true,
    component: Mural,
    type: [1, 3, 4],
  },
  {
    path: "/console/eventos/upload",
    exact: true,
    component: Mural,
    type: [2],
  },
  {
    path: "/console/biblia",
    exact: true,
    component: Biblia,
    type: [2],
  },
  {
    path: "/console/chat",
    exact: true,
    component: GruposChat,
    type: [2, 3, 4],
  },
  {
    path: "/console/hinario",
    exact: true,
    component: Hinario,
    type: [2],
  },
  {
    path: "/console/midias",
    exact: true,
    component: Midias,
    type: [2],
  },
  {
    path: "/console/midias/resumo",
    exact: true,
    component: MidiaDetails,
    type: [2],
  },
  {
    path: "/console/relatorios",
    exact: true,
    component: RelatoriosBI,
  },
  {
    path: "/console/saude",
    exact: true,
    component: IframeSaude,
    type: [3],
  },
  {
    path: "/console/saude/value",
    exact: true,
    component: IframeSaude,
    type: [3],
  },
  {
    path: "/console/saude/terms",
    exact: true,
    component: IframeSaude,
    type: [3],
  },
  {
    path: "/console/saude/provider",
    exact: true,
    component: IframeSaude,
    type: [3],
  },
  {
    path: "/console/vendas",
    exact: true,
    component: RelatorioVendas,
    type: [2, 3, 4],
  },
  // {
  //   path: "/console/cartao",
  //   exact: true,
  //   component: Cartao,
  // },
];

export default routes;
