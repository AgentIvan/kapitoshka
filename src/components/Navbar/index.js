import cn from 'classnames';

import s from './styles.module.css';

const Navbar = ({ isOpen, bgActive = false, onMenuOpenClose }) => {
    const handleClick = () => {
        console.log('####: <Navbar />');
        onMenuOpenClose && onMenuOpenClose();
    };
    return (
        <nav className={cn(s.root, {[s.bgActive]: bgActive})}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                LOGO
                </p>
                <div onClick={handleClick} className={cn(s.menuButton, {[s.active]: isOpen})}>
                <span />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;