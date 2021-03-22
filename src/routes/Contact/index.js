import { useHistory } from 'react-router-dom';
import s from './styles.module.css';

const ContactPage = () => {
  const history = useHistory();
  const handleClick = () => {
    console.log('####: <ContactPage />', 'app');
    history.push('/');
  };
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>This is our Contact Page</h1>
        <button onClick={handleClick}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ContactPage;