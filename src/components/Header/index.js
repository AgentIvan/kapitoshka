import { useHistory } from 'react-router-dom';
import s from './styles.module.css'


const Header = ({ title, descr, onClickButon }) => {
    const history = useHistory();
    const handleClick = () => {
        console.log('####: <Header />', 'game');
        history.push('/game');
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