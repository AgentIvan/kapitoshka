import cn from 'classnames';

import s from './styles.module.css';

const PokemonCard = ({ keyId, id, name, img, type, values, isActive, isSelected, onClick, minimize, className }) => {
  const handleClick = () => {
    console.log(`name: ${name}, ${id} ${keyId}`);
    onClick && onClick();
  };
  
  return (
    <div
      className={cn(className, s.pokemonCard, {[s.active]: isActive, [s.selected]: isSelected})}
      onClick={handleClick}
    >
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
            { !minimize && (
              <div className={s.info}>
                <span className={s.number}>#{id}</span>
                <h3 className={s.name}>
                  {name}
                </h3>
                <small className={s[type]}>
                  Type: <span>{type}</span>
                </small>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={s.cardBack}>
        <div className={cn(s.wrap, s.back)} />
      </div>

    </div>
  );
};

export default PokemonCard;
