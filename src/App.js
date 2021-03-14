import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import KapitoshkaCard from './components/KapitoshkaCard';
import './App.css';

import bg1 from './assets/bg1.jpg';
import bg3 from './assets/bg3.jpg';
// import { ReactComponent as ReactLogo } from './assets/logo.svg'
import KAPITOSHKAS from './consts'

const App = () => {
  return (
      <>
        <Header title="Kapitoshka" descr="This is simple triad card game"/>
        <Layout
          id="rules"
          title="Rules"
          urlBg={bg1}
        >
          <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.</p>
          <p>Each player has five cards in its deck, and the aim is to  capture the opponent's cards by turning them into the player's own color of red or blue.</p>
        </Layout>
        <Layout
          id="cards"
          title="Cards" 
          colorTitle="#FEFEFE" 
          colorBg="#202736"
        >
          <div className="flex">
            {KAPITOSHKAS.map(item => 
              <KapitoshkaCard
                key={item.id}
                {...item}
              />
            )}
          </div>
        </Layout>
        <Layout
          id="about"
          title="Full rules"
          urlBg={bg3}
        >
          <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.</p>
          <p>Each player has five cards in its deck, and the aim is to  capture the opponent's cards by turning them into the player's own color of red or blue.</p>
        </Layout>
        <Footer />
      </>

  );
};

export default App;
