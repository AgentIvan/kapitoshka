import cn from 'classnames';
import { Link } from 'react-router-dom';

import s from './styles.module.css';

const MENU = [
  {
    title: 'HOME',
    to: 'home',
  },
  {
    title: 'GAME',
    to: 'game',
  },
  {
    title: 'ABOUT',
    to: 'about',
  },
  {
    title: 'CONTACT',
    to: 'contact',
  },
];

const Menu = ({ isOpen, onMenuOpenClose }) => {
  const handleClick = () => {
    console.log('####: <Menu />');
    onMenuOpenClose && onMenuOpenClose();
  };
  return (
    <div className={cn(s.menuContainer, {[s.active]: isOpen, [s.deactive]: isOpen === false})}>
      <div className={s.overlay} />
      <div className={s.menuItems} onClick={handleClick}>
        <ul>
          {
            MENU.map(menu => (
              <li key={menu.to}>
                <Link to={menu.to}>{menu.title}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Menu;