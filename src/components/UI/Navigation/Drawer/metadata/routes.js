import PersonIcon from "@material-ui/icons/Person";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

const routes = [
  {
    parentName: "Usuários",
    parentIcon: PeopleAltIcon,
    childrens: [
      {
        name: "Meu perfil",
        route: "/perfil",
        icon: PersonIcon
      },
      {
        name: "Usuários cadastrados",
        route: "/usuarios",
        icon: ContactsOutlinedIcon
      }
    ]
  },
  {
    parentName: "Instituição",
    parentIcon: AccountBalanceOutlinedIcon,
    childrens: [
      {
        name: "Minha Instituição",
        route: "/minha-instituicao",
        icon: AccountBalanceOutlinedIcon
      },
      {
        name: "Mensagem Institucional",
        route: "/instituicoes/mensagem",
        icon: EmailOutlinedIcon
      }
    ]
  }
];

export default routes;
