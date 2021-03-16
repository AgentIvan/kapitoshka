import { useState } from 'react'
import s from './styles.module.css'
import cardBackSide from './assets/card-back-side.jpg';
const KapitoshkaCard = ({ id, name, img, type, values, ...props }) => {
    const [active, setActive] = useState(false);
    const handleClick = () => {
        console.log(`name: ${name}`);
        setActive(active => !active);
    };
    return (
        <div className={s.root} onClick={handleClick}>
            <div className={`${s.pokemonCard} ${active ? s.active : ""}`}>
                <div className={s.cardFront}>
                    <div className={`${s.wrap} ${s.front}`}>
                        <div className={`${s.pokemon} ${s[type]}`}>
                            <div className={s.values}>
                                <div className={`${s.count} ${s.top}`}>{values.top}</div>
                                <div className={`${s.count} ${s.right}`}>{values.right}</div>
                                <div className={`${s.count} ${s.bottom}`}>{values.bottom}</div>
                                <div className={`${s.count} ${s.left}`}>{values.left}</div>
                            </div>
                            <div className={s.imgContainer}>
                                <img src={img} alt={name} />
                            </div>
                            <div className={s.info}>
                                <span className={s.number}>#{id}</span>
                                <h3 className={s.name}>
                                    {name}
                                </h3>
                                <small className={s[type]}>
                                    Type: <span>{type}</span>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.cardBack}>
                    <div className={`${s.wrap} ${s.back}`}>
                        <img src={cardBackSide} alt="Сard Backed" />
                    </div>
                </div>

            </div>
        </div>
    );};

export default KapitoshkaCard;