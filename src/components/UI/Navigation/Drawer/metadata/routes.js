// import PersonIcon from "@material-ui/icons/Person";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import ArtTrackOutlined from "@material-ui/icons/ArtTrackOutlined";
import BookIcon from "@material-ui/icons/Book";
import QueueMusic from "@material-ui/icons/QueueMusic";

const routes = [
  {
    parentName: "Usuários",
    parentIcon: PeopleAltIcon,
    childrens: [
      // {
      //   name: "Meu perfil",
      //   route: "/perfil",
      //   icon: PersonIcon,
      // },
      {
        name: "Usuários cadastrados",
        route: "/usuarios",
        icon: ContactsOutlinedIcon,
      },
    ],
  },
  {
    parentName: "Instituição",
    parentIcon: AccountBalanceOutlinedIcon,
    childrens: [
      // {
      //   name: "Minha Instituição",
      //   route: "/minha-instituicao",
      //   icon: AccountBalanceOutlinedIcon,
      // },
      {
        name: "Mensagem Institucional",
        route: "/instituicoes/mensagem",
        icon: EmailOutlinedIcon,
      },
    ],
  },
  {
    parentName: "Mural",
    parentIcon: ArtTrackOutlined,
    parentPath: "/mural/upload",
    type: 1,
  },
  {
    parentName: "Eventos",
    parentIcon: ArtTrackOutlined,
    parentPath: "/eventos/upload",
    type: 2,
  },
  {
    parentName: "Bíblia",
    parentIcon: BookIcon,
    parentPath: "/biblia",
    type: 2,
  },
  {
    parentName: "Hinário",
    parentIcon: QueueMusic,
    parentPath: "/hinario",
    type: 2,
  },
];

export default routes;
