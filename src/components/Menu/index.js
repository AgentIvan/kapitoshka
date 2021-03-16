import cn from 'classnames';

import s from './styles.module.css';

const Menu = ({ isActive, onClickButon, onMenuClickButton }) => {
    const handleClick = (event) => {
        console.log('####: <Menu />');
        onClickButon && onClickButon();
        const { href } = event.target;
        onMenuClickButton && onMenuClickButton(href.split("#")[1]);
    };
    return (
        <div className={cn(s.menuContainer, {[s.active]: isActive, [s.deactive]: isActive === false})}>
            <div className={s.overlay} />
            <div className={s.menuItems} onClick={handleClick}>
                <ul>
                    <li>
                        <a href="#welcome">
                        HOME
                        </a>
                    </li>
                    <li>
                        <a href="#game">
                        GAME
                        </a>
                    </li>
                    <li>
                        <a href="#about">
                        ABOUT
                        </a>
                    </li>
                    <li>
                        <a href="#contact">
                        CONTACT
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;