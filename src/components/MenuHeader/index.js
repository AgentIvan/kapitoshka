// import cn from 'classnames';
import { useState } from 'react';
import Menu from '../Menu';
import Navbar from '../Navbar';

// import s from './styles.module.css';

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setOpen] = useState(null);
  const handleMenuOpenClose = () => {
    console.log('####: <MenuHeader />', isOpen ? 'close' : 'open');
    setOpen(active => !active);
  };
  return (
    <>
      <Menu isOpen={isOpen} onMenuOpenClose={handleMenuOpenClose} />
      <Navbar isOpen={isOpen} bgActive={bgActive} onMenuOpenClose={handleMenuOpenClose} />
    </>
  );
};

export default MenuHeader;