import { useHistory } from 'react-router-dom';
import s from './styles.module.css';
import PokemonCard from '../../components/PokemonCard';

const GamePage = ({ pokemons, setPokemons, writeDB, onAddNewPokemon }) => {
    const history = useHistory();
    const handleClick = () => {
        console.log('####: <GamePage />', 'app');
        history.push('/');
    };
    const entries = pokemons && Object.entries(pokemons);
    const handleAddNewPokemon = () => {     
        console.log('####: <GamePage />', 'handleAddNewPokemon');
        const rand = Math.floor(Math.random()*5);
        onAddNewPokemon(entries[rand][1]);
    };
    // const handleCardClick = (id) => {
    //     // setPokemons(pokemons => pokemons.map(el => el.id === id ? {...el, active: true} : el));
    //     setPokemons(id);
    // };
    const handleWriteDB = (keyId, active) => {
        writeDB && writeDB(keyId, active);
    };
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