import { useHistory } from 'react-router-dom';
import s from './styles.module.css';

const AboutPage = () => {
    const history = useHistory();
    const handleClick = () => {
        console.log('####: <GamePage />', 'app');
        history.push('/');
    };
    return (
        <div className={s.root}>
            <div className={s.container}>
                <h1>This is our About Page</h1>
                <button onClick={handleClick}>
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default AboutPage;