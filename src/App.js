// import { useState } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import HomePage from './routes/Home';
import GamePage from './routes/Game';
import AboutPage from './routes/About';
import ContactPage from './routes/Contact';
import { FireBaseContext } from './context/firebaseContext';

import cn from 'classnames';
import s from './styles.module.css';
import Firebase from './service/firebase';

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  return (
    <FireBaseContext.Provider value={new Firebase()}>
      <Switch>
        <Route path="/404" render={() => <h1>404 Not Found</h1>} />
        <Route>
          <>
            <MenuHeader
              bgActive={!isHomePage}
              onMenuClickButton={() => {console.log('MenuHeader')}}
            />
              <div className={cn(s.wrap, {
                [s.isHomePage]: isHomePage
              })}>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/home" component={HomePage} />
                  <Route path="/game" component={GamePage} />
                  <Route path="/about" component={AboutPage} />
                  <Route path="/contact" component={ContactPage} />
                  <Route render={() => <Redirect to="/404" />} />                
                </Switch>
              </div>
            <Footer />
          </>
        </Route>
      </Switch>
    </FireBaseContext.Provider>
  );
};

export default App;
