import { useState } from 'react';
import HomePage from './routes/Home';
import GamePage from './routes/Game';
// import cn from 'classnames';

// import s from './styles.module.css';

const App = () => {
    const [page, setPage] = useState('app');
    const handleChangePage = (page) => {
      console.log('####: <Main />', page);
        setPage(page);
    };
    switch (page) {
      case 'app':
        return <HomePage onChangePage={handleChangePage}/>;
      case 'game':
        return <GamePage onChangePage={handleChangePage}/>
      default:
        return <HomePage onChangePage={handleChangePage}/>;
    }
  };

export default App;