import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import s from './styles.module.css';
import POKEMONS from '../../consts'
import PokemonCard from '../../components/PokemonCard';

const GamePage = () => {
    const history = useHistory();
    const handleClick = () => {
        console.log('####: <GamePage />', 'app');
        history.push('/');
    };
    const [pokemons, setPokemons] = useState(POKEMONS);
    const [activeCards, setActiveCards] = useState([]);
    const handleCardClick = (id) => {
        setActiveCards(activeCards => ([...activeCards, id]))
        setPokemons(pokemons.map(el => ({...el, ...(el.id === id && {active: true})})))
    };
    return (
        <div className={s.root}>
            <div className={s.container}>
                <button onClick={handleClick}>Go Home</button>
                <div className="flex">
                    {pokemons.map(item => 
                    <PokemonCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        img={item.img}
                        type={item.type}
                        values={item.values}
                        isActive={item.active}
                        // isActive={activeCards.list.includes(item.id)}
                        onCardClick={handleCardClick}
                    />
                    )}
                </div>
            </div>
        </div>
    );
};

export default GamePage;