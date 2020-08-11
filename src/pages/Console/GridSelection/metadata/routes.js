import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import ArtTrackOutlined from "@material-ui/icons/ArtTrackOutlined";
import BookIcon from "@material-ui/icons/Book";
import ChatIcon from "@material-ui/icons/Chat";
import QueueMusic from "@material-ui/icons/QueueMusic";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// import GpsFixed from "@material-ui/icons/GpsFixed";
// import PersonIcon from "@material-ui/icons/Person";
// import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
// import CreditCardIcon from "@material-ui/icons/CreditCard";

const routes = [
  {
    name: "Usuários Cadastrados",
    icon: PeopleAltIcon,
    path: "/usuarios",
  },
  {
    name: "Perfil",
    icon: AccountBalanceOutlinedIcon,
    path: "/minha-instituicao",
  },
  {
    name: "Mensagem Instantânea",
    icon: EmailOutlinedIcon,
    path: "/instituicoes/mensagem",
  },
  {
    name: "Mural",
    icon: ArtTrackOutlined,
    path: "/mural/upload",
    type: [1, 3],
  },
  {
    name: "Eventos",
    icon: ArtTrackOutlined,
    path: "/eventos/upload",
    type: [2],
  },
  {
    name: "Bíblia",
    icon: BookIcon,
    path: "/biblia",
    type: [2],
  },
  {
    name: "Grupos Chat",
    icon: ChatIcon,
    path: "/chat",
    type: [2, 3],
  },
  {
    name: "Hinário",
    icon: QueueMusic,
    path: "/hinario",
    type: [2],
  },
  {
    name: "Mídias",
    icon: PhotoLibrary,
    path: "/midias",
    type: [2],
  },
  {
    name: "Relatórios",
    icon: AssessmentIcon,
    path: "/relatorios",
  },
  {
    name: "Plano de Saúde",
    icon: AddShoppingCartIcon,
    path: "/saude",
    type: [2, 3],
  },
  // {
  //   name: "Localização",
  //   icon: GpsFixed,
  //   path: "/instituicoes/localizacao",
  //   type: [1, 2],
  // },
  // {
  //   name: "Instituição",
  //   icon: AccountBalanceOutlinedIcon,
  //   childrens: [
  //     {
  //       name: "Minha Instituição",
  //       route: "/minha-instituicao",
  //       icon: AccountBalanceOutlinedIcon,
  //     },
  //     {
  //       name: "Mensagem Institucional",
  //       route: "/instituicoes/mensagem",
  //       icon: EmailOutlinedIcon,
  //     },
  //     {
  //       name: "Localização",
  //       route: "/instituicoes/localizacao",
  //       icon: GpsFixed,
  //       type: [1, 2],
  //     },
  //   ],
  // },
  // {
  //   name: "Relatório de Vendas",
  //   icon: AddShoppingCartIcon,
  //   path: "/vendas",
  // },
  // {
  //   name: "Cartão",
  //   icon: CreditCardIcon,
  //   path: "/cartao",
  // },
];

export default routes;
