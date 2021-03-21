import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import s from './styles.module.css';
import PokemonCard from '../../components/PokemonCard';

const GamePage = ({ database }) => {
    const history = useHistory();
    
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    database.ref('pokemons').once('value', (snapshot) => {
      const values = snapshot.val();
      console.log('####: App useEffect', values);
      setPokemons(values);
    });
  },[]);

  const handleWriteDB = (keyId, active) => {
    database.ref('pokemons/' + keyId).update({active: !active}, (error) => {
      if (error) {
        console.log('####: App error', error);
      } else {
        console.log('####: App handleWriteDB Data saved successfully!');
        setPokemons(prevState => {
          const result = Object.entries(prevState).reduce((acc, item) => {
            const key = item[0];
            const pokemon = {...item[1]};
              if (keyId === key)
                  pokemon.active = !pokemon.active;
      
              acc[item[0]] = pokemon;
              return acc;
          }, []);
          console.log('####: App handleWriteDB result', result);
    
          // database.ref('pokemons').update('value', pokemons);      
          return result;
        });
      }
    });
  };

  function handleAddNewPokemon() {
    const rand = Math.floor(Math.random()*5);
    const pokemon = entries[rand][1];
    // A post entry.
    var newPokemon = {
      ...pokemon,
      id: Math.floor(Math.random()*100),
    };
  
    // Get a key for a new Post.
    const newKey = database.ref().child('pokemons').push().key;
  
    // Write the new pokemon's data in the pokemons list.  
    database.ref('pokemons/' + newKey).set(newPokemon, (error) => {
      if (error) {
        console.log('####: App error', error);
      } else {
        console.log('####: App handleAddNewPokemon Data saved successfully!');
        setPokemons(prevState => {
          const result = { ...prevState, [newKey]:newPokemon };
          console.log('####: App handleAddNewPokemon new pokemons', result);
          return result;
        });
      }
    });
  }
    const handleClick = () => {
        console.log('####: <GamePage />', 'app');
        history.push('/');
    };
    const entries = pokemons && Object.entries(pokemons);

    return (
        <div className={s.root}>
            <div className={s.container}>
                <div className={s.buttons}>
                    <button className={s.button} onClick={handleAddNewPokemon}>Add New</button>
                    <button className={s.button} onClick={handleClick}>Go Home</button>
                </div>
                <div className={s.flex}>
                    {pokemons && Object.entries(pokemons).map(([key, item]) => 
                        item.id && <PokemonCard
                            key={key}
                            keyId={key}
                            id={item.id}
                            name={item.name}
                            img={item.img}
                            type={item.type}
                            values={item.values}
                            isActive={item.active}
                            writeDB={handleWriteDB}
                        />                    
                    )}
                </div>
            </div>
        </div>
    );
};

export default GamePage;