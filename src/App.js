import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import './App.css';

import bg1 from './assets/bg1.jpg';
import bg3 from './assets/bg3.jpg';
// import { ReactComponent as ReactLogo } from './assets/logo.svg'


const App = () => {
  return (
      <>
        <Header title="Header Title" descr="Title description"/>
        <Layout title="Layout 1 Title" descr="description 1" urlBg={bg1}/>
        <Layout title="Layout 2 Title" descr="description 2" colorBg="#e2e2e2"/>
        <Layout title="Layout 3 Title" descr="description 3" urlBg={bg3}/>
        <Footer />
      </>

  );
};

export default App;
