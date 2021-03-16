// import cn from 'classnames';

import s from './styles.module.css';

const GamePage = ({ onChangePage }) => {
    const handleClick = () => {
        console.log('####: <GamePage />', 'app');
        onChangePage && onChangePage('app');
    };
    return (
        <div className={s.root}>
            <div className={s.container}>
                <button onClick={handleClick} style={{margin: "0 auto"}}>Go Home</button>
            </div>
        </div>
    );
};

export default GamePage;