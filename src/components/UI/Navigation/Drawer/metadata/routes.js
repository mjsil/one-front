import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import ArtTrackOutlined from "@material-ui/icons/ArtTrackOutlined";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
// import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
// import BookIcon from "@material-ui/icons/Book";
// import ChatIcon from "@material-ui/icons/Chat";
// import QueueMusic from "@material-ui/icons/QueueMusic";
// import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
// import AssessmentIcon from "@material-ui/icons/Assessment";
// import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
// import GpsFixed from "@material-ui/icons/GpsFixed";
// import PersonIcon from "@material-ui/icons/Person";
// import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
// import CreditCardIcon from "@material-ui/icons/CreditCard";

const routes = [
  {
    parentName: "Home",
    parentIcon: HomeIcon,
    parentPath: "/",
  },
  {
    parentName: "Usuários Cadastrados",
    parentIcon: PeopleAltIcon,
    parentPath: "/usuarios",
  },
  // {
  //   parentName: "Publicidades",
  //   parentIcon: ViewCarouselIcon,
  //   parentPath: "/propaganda/upload",
  //   type: [5],
  // },
  {
    parentName: "Mensagem Instantânea",
    parentIcon: EmailOutlinedIcon,
    parentPath: "/instituicoes/mensagem",
  },
  {
    parentName: "Mural",
    parentIcon: ArtTrackOutlined,
    parentPath: "/mural/upload",
    // type: [1, 3, 4],
    type: [9],
  },
  {
    parentName: "Metas",
    parentIcon: TrendingUpIcon,
    parentPath: "/mural/upload",
    // type: [1, 3, 4],
    type: [9],
  },
  {
    parentName: "Pagamentos",
    parentIcon: LocalAtmIcon,
    parentPath: "/mural/upload",
    // type: [1, 3, 4],
    type: [9],
  },
  // {
  //   parentName: "Ganhos",
  //   parentIcon: MonetizationOnIcon,
  //   parentPath: "/ganhos/upload",
  //   type: [5, 3, 4],
  // },
  // {
  //   parentName: "Publicações",
  //   parentIcon: ArtTrackOutlined,
  //   parentPath: "/mural/upload",
  //   type: [5],
  // },
  // {
  //   parentName: "Eventos",
  //   parentIcon: ArtTrackOutlined,
  //   parentPath: "/eventos/upload",
  //   type: [2],
  // },
  // {
  //   parentName: "Bíblia",
  //   parentIcon: BookIcon,
  //   parentPath: "/biblia",
  //   type: [2],
  // },
  // {
  //   parentName: "Grupos Chat",
  //   parentIcon: ChatIcon,
  //   parentPath: "/chat",
  //   type: [2, 3, 4],
  // },
  // {
  //   parentName: "Hinário",
  //   parentIcon: QueueMusic,
  //   parentPath: "/hinario",
  //   type: [2],
  // },
  // {
  //   parentName: "Mídias",
  //   parentIcon: PhotoLibrary,
  //   parentPath: "/midias",
  //   type: [2],
  // },
  // {
  //   parentName: "Relatório de Vendas",
  //   parentIcon: AddShoppingCartIcon,
  //   parentPath: "/vendas",
  //   type: [2, 3, 4, 5],
  // },
  // {
  //   parentName: "Relatórios",
  //   parentIcon: AssessmentIcon,
  //   parentPath: "/relatorios",
  // },
  // {
  //   parentName: "Vendas",
  //   parentIcon: LocalHospitalIcon,
  //   parentPath: "/saude",
  //   type: [3],
  // },
  // {
  //   parentName: "Valores do Plano",
  //   parentIcon: LocalHospitalIcon,
  //   parentPath: "/saude/value",
  //   type: [3],
  // },
  // {
  //   parentName: "Termos de Uso",
  //   parentIcon: LocalHospitalIcon,
  //   parentPath: "/saude/terms",
  //   type: [3],
  // },
  // {
  //   parentName: "Rede Credenciada",
  //   parentIcon: LocalHospitalIcon,
  //   parentPath: "/saude/provider",
  //   type: [3],
  // },
  {
    parentName: "Perfil",
    parentIcon: AccountBalanceOutlinedIcon,
    parentPath: "/minha-instituicao",
  },
  // {
  //   parentName: "Localização",
  //   parentIcon: GpsFixed,
  //   parentPath: "/instituicoes/localizacao",
  //   type: [1, 2],
  // },
  // {
  //   parentName: "Instituição",
  //   parentIcon: AccountBalanceOutlinedIcon,
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
  //   parentName: "Relatório de Vendas",
  //   parentIcon: AddShoppingCartIcon,
  //   parentPath: "/vendas",
  // },
  // {
  //   parentName: "Cartão",
  //   parentIcon: CreditCardIcon,
  //   parentPath: "/cartao",
  // },
];

export default routes;
