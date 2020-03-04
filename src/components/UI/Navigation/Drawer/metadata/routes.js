import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
// import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
// import BusinessIcon from '@material-ui/icons/Business';
// import PermDataSettingOutlinedIcon from '@material-ui/icons/PermDataSettingOutlined';
// import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
// import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
// import ArtTrackOutlinedIcon from '@material-ui/icons/ArtTrackOutlined';
// import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
// import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
// import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
// import CropRotateOutlinedIcon from '@material-ui/icons/CropRotateOutlined';
// import RedeemOutlinedIcon from '@material-ui/icons/RedeemOutlined';
// import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';
// import CropFreeOutlinedIcon from '@material-ui/icons/CropFreeOutlined';
// import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
// import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
// import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
// import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
// import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
// import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
// import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
// import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
// import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
// import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
// import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

const routes = [
  {
    parentName: 'Usuários',
    parentIcon: PeopleAltIcon,
    childrens: [
      {
        name: 'Meu perfil',
        route: '/perfil',
        icon: PersonIcon,
      },
      {
        name: 'Novo usuário',
        route: '/novo-usuario',
        icon: PersonAddIcon,
      },
      {
        name: 'Usuários cadastrados',
        route: '/usuarios',
        icon: ContactsOutlinedIcon
      },
      {
        name: 'Grupos Chat',
        route: '/grupos-chat',
        icon: RecordVoiceOverOutlinedIcon
      }
      // {
      //   name: 'Contatos chat',
      //   route: '/contatos-chat',
      //   icon: RecordVoiceOverOutlinedIcon
      // }
    ]
  },
  {
    parentName: 'Instituição',
    parentIcon: AccountBalanceOutlinedIcon,
    childrens: [
      {
        name: 'Minha Instituição',
        route: '/minha-instituicao',
        icon: AccountBalanceOutlinedIcon,
      },
      {
        name: 'Mensagem Institucional',
        route: '/instituicoes/mensagem',
        icon: EmailOutlinedIcon,
      }
    ]
  },
  // {
  //   parentName: 'Instituições',
  //   parentIcon: AccountBalanceOutlinedIcon,
  //   childrens: [
  //     {
  //       name: 'Instituições Cadastradas',
  //       route: '/instituicoes',
  //       icon: AccountBalanceWalletOutlinedIcon,
  //     },
  //     {
  //       name: 'Cadastrar Instituição',
  //       route: '/nova-instituicao',
  //       icon: BusinessIcon,
  //     },
  //     {
  //       name: 'Set para instituições',
  //       route: '/instituicoes/set',
  //       icon: PermDataSettingOutlinedIcon
  //     },
  //     {
  //       name: 'Localização de instituições',
  //       route: '/instituicoes/local',
  //       icon: PublicOutlinedIcon
  //     },
  //     {
  //       name: 'Mensagem institucional',
  //       route: '/instituicoes/mensagem',
  //       icon: EmailOutlinedIcon
  //     },
  //     {
  //       name: 'Mídias',
  //       route: '/instituicoes/midias',
  //       icon: PlayCircleFilledWhiteOutlinedIcon
  //     }
  //   ]
  // },
  // {
  //   parentName: 'Mural',
  //   parentIcon: ArtTrackOutlinedIcon,
  // },
  // {
  //   parentName: 'Relatório de vendas',
  //   parentIcon: ShoppingCartOutlinedIcon,
  //   childrens: [
  //     {
  //       name: 'Plano de saúde',
  //       route: '/plano-saude',
  //       icon: AddShoppingCartOutlinedIcon,
  //     }
  //   ]
  // },
  // {
  //   parentName: 'Cartões',
  //   parentIcon: PaymentOutlinedIcon,
  //   childrens: [
  //     {
  //       name: 'Recargas',
  //       route: '/recargas',
  //       icon: CropRotateOutlinedIcon,
  //     },
  //     {
  //       name: 'Solicitações de cartões',
  //       route: '/cartao/solicitacao',
  //       icon: RedeemOutlinedIcon,
  //     },
  //     {
  //       name: 'Solicitações de recarga',
  //       route: '/recarga/solicitacao',
  //       icon: RedoOutlinedIcon,
  //     },
  //     {
  //       name: 'Código Serial',
  //       route: '/serial/codigo',
  //       icon: CropFreeOutlinedIcon,
  //     }
  //   ]
  // },
  // {
  //   parentName: 'MarketPlace',
  //   parentIcon: MonetizationOnOutlinedIcon,
  //   childrens: [
  //     {
  //       name: 'Boletos',
  //       route: '/marketplace/boletos',
  //       icon: InsertDriveFileOutlinedIcon,
  //     },
  //     {
  //       name: 'Categorias',
  //       route: '/marketplace/categorias',
  //       icon: CategoryOutlinedIcon,
  //     },
  //     {
  //       name: 'Comissões e Categorias',
  //       route: '/marketplace/comissoes-categorias',
  //       icon: InfoOutlinedIcon,
  //     },
  //     {
  //       name: 'Exportação de Comissões',
  //       route: '/marketplace/comissoes/exportacao',
  //       icon: SendOutlinedIcon,
  //     },
  //     {
  //       name: 'Relatórios de Comissões',
  //       route: '/marketplace/comissoes/relatorios',
  //       icon: DescriptionOutlinedIcon,
  //     },
  //     {
  //       name: 'Políticas de Comissões',
  //       route: '/marketplace/comissoes/politicas',
  //       icon: ImportContactsOutlinedIcon,
  //     },
  //     {
  //       name: 'Saques instituição',
  //       route: '/marketplace/instituicao/saque',
  //       icon: GetAppOutlinedIcon,
  //     },
  //     {
  //       name: 'Saques usuários',
  //       route: '/marketplace/usuario/saque',
  //       icon: GetAppOutlinedIcon,
  //     },
  //     {
  //       name: 'Produtos',
  //       route: '/marketplace/produtos',
  //       icon: LocalMallOutlinedIcon,
  //     },
  //     {
  //       name: 'Tutoriais',
  //       route: '/marketplace/tutoriais',
  //       icon: MenuBookOutlinedIcon,
  //     }
  //   ]
  // },
  // {
  //   parentName: 'Termos',
  //   parentIcon: CreateOutlinedIcon,
  // }
];

export default routes;