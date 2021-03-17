// import cn from 'classnames';
import { useState } from 'react';
import Menu from '../Menu';
import Navbar from '../Navbar';

// import s from './styles.module.css';

const MenuHeader = ({ bgActive, onMenuClickButton }) => {
    const [isActive, setActive] = useState(null);
    const handleClick = () => {
        console.log('####: <MenuHeader />', isActive ? 'close' : 'open');
        setActive(active => !active);
    };
    // const handleMenuClickButton = (page) => {
    //     console.log('####: <MenuHeader />', page);
    //     onMenuClickButton(page);
    // }
    return (
        <>
            <Menu isActive={isActive} onClickButon={handleClick} />
            <Navbar isActive={isActive} bgActive={bgActive} onClickButon={handleClick} />
        </>
    );
};

export default MenuHeader;