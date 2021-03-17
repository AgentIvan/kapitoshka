import cn from 'classnames';

import s from './styles.module.css';

const Navbar = ({ isActive, bgActive = false, onClickButon }) => {
    const handleClick = () => {
        console.log('####: <Navbar />');
        onClickButon && onClickButon();
    };
    return (
        <nav className={cn(s.root, {[s.bgActive]: bgActive})}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                LOGO
                </p>
                <div onClick={handleClick} className={cn(s.menuButton, {[s.active]: isActive})}>
                <span />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;