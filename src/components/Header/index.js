// import React from 'react'; -- deprecated
import s from './styles.module.css'


const Header = ({ title, descr, onClickButon }) => {
    const handleClick = () => {
        console.log('####: <Header />', 'game');
        onClickButon && onClickButon('game');
    };
    return (
        <header className={s.root}>
            <div className={s.forest}></div>
            <div className={s.container}>
                <h1>{title}</h1>
                <p>{descr}</p>
                <button onClick={handleClick}>
                    Start Game
                </button>
            </div>
        </header>
    )
};

export default Header;