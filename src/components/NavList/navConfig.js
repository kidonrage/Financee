import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import EventNoteIcon from '@material-ui/icons/EventNote';

export default [
  {
    title: 'Главная',
    icon: DashboardIcon,
    href: '/'
  },
  {
    title: 'Доходы',
    icon: AttachMoneyIcon,
    href: '/income'
  },
  {
    title: 'Расходы',
    icon: MoneyOffIcon,
    href: '/expenses'
  },
  {
    title: 'Планирование',
    icon: EventNoteIcon,
    href: '/planning'
  },
  {
    title: 'Профиль',
    icon: PersonIcon,
    href: '/profile'
  }
]