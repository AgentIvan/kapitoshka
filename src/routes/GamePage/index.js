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
    const [activeCards, setActiveCards] = useState({list: []});
    const handleCardClick = (id) => {
        setActiveCards(activeCards => ({ list: [...activeCards.list, id] }) );
    };
    return (
        <div className={s.root}>
            <div className={s.container}>
                <button onClick={handleClick}>Go Home</button>
                <div className="flex">
                    {POKEMONS.map(item => 
                    <PokemonCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        img={item.img}
                        type={item.type}
                        values={item.values}
                        isActive={activeCards.list.includes(item.id)}
                        onCardClick={handleCardClick}
                    />
                    )}
                </div>
            </div>
        </div>
    );
};

export default GamePage;