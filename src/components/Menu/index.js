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

const Menu = ({ isActive, onClickButon }) => {
    const handleClick = (event) => {
        console.log('####: <Menu />');
        onClickButon && onClickButon();
    };
    return (
        <div className={cn(s.menuContainer, {[s.active]: isActive, [s.deactive]: isActive === false})}>
            <div className={s.overlay} />
            <div className={s.menuItems} onClick={handleClick}>
                <ul>
                    {
                        MENU.map(menu => (
                            <li key={menu.to}>
                                <Link to={menu.to} children={menu.title} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Menu;