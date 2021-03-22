import Header from '../../components/Header';
import Layout from '../../components/Layout';
import '../../App.css';

import bg1 from '../../assets/bg1.jpg';
import bg3 from '../../assets/bg3.jpg';

const HomePage = () => {
  return (
    <>
      <Header
        title="Pokemons game!"
        descr="This is simple triad card game"
      />
      <Layout
        id="rules"
        title="Rules"
        urlBg={bg1}
      >
        <p>In the game two players face off against one another, one side playing as &ldquo;blue&rdquo;, the other as &ldquo;red&rdquo; on a 3x3 grid.</p>
        <p>Each player has five cards in its deck, and the aim is to  capture the opponent&apos;s cards by turning them into the player&apos;s own color of red or blue.</p>
      </Layout>
      <Layout
        id="about"
        title="Full rules"
        urlBg={bg3}
      >
        <p>In the game two players face off against one another, one side playing as &ldquo;blue&rdquo;, the other as &ldquo;red&rdquo; on a 3x3 grid. Each player has five cards in a hand and the aim is to capture the opponent&apos;s cards by turning them into the player&apos;s own color of red or blue.</p>
        <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player&apos;s card color. To do this, the player must capture cards by placing a card adjacent to an opponent&apos;s card whereupon the &ldquo;ranks&rdquo; of the sides where the two cards touch will be compared. If the rank of the opponent&apos;s card is higher than the player&apos;s card, the player&apos;s card will be captured and turned into the opponent&apos;s color. If the player&apos;s rank is higher, the opponent&apos;s card will be captured and changed into the player&apos;s color instead.</p>
      </Layout>
    </>
  );
};

export default HomePage;
