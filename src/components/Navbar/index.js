import cn from 'classnames';

import s from './styles.module.css';

const Navbar = ({ isActive, onClickButon }) => {
    const handleClick = () => {
        console.log('####: <Navbar />');
        onClickButon && onClickButon();
    };
    return (
        <nav className={s.root}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                LOGO
                </p>
                <a href="/#" onClick={handleClick} className={cn(s.menuButton, {[s.active]: isActive})}>
                <span />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;