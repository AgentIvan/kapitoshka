import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
// import { useState } from 'react';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import HomePage from './routes/HomePage';
import GamePage from './routes/GamePage';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage';

import cn from 'classnames';
import s from './styles.module.css';

const App = () => {
  const match1 = useRouteMatch('/');
  const match2 = useRouteMatch('/home');
  const isExact = match1?.isExact === true || match2?.isExact === true;
  console.log('####: match ', match1, match2, isExact);
  return (
    <Switch>
      <Route path="/404" render={() => <h1>404 Not Found</h1>} />
      <Route>
        <>
          <MenuHeader
            bgActive={!isExact}
            onMenuClickButton={() => {console.log('MenuHeader')}}
          />
            <div className={cn(s.wrap, {
              [s.isHomePage]: isExact
            })}>
              <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/game" component={GamePage}/>
                <Route path="/about" component={AboutPage}/>
                <Route path="/contact" component={ContactPage}/>
                <Route path="/about" render={() => (
                    <h1>This is page About</h1>
                )} />
                <Route render={() => <Redirect to="/404"/>}/>                
              </Switch>
            </div>
          <Footer />
        </>
      </Route>
    </Switch>
  );
};

export default App;