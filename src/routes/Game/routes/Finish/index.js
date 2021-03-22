import { useHistory } from 'react-router-dom';
import s from './styles.module.css';

const FinishPage = () => {
  const history = useHistory();
  const handleClick = () => {
    console.log('####: <FinishPage />', 'app');
    history.push('/');
  };
  return (
    <div className={s.root}>
    <div className={s.container}>
      <h1>This is our Finish Page</h1>
      <button onClick={handleClick}>
      Go Home
      </button>
    </div>
    </div>
  );
};
  
export default FinishPage;