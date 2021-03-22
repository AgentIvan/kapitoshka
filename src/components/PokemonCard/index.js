import cn from 'classnames';

import cardBackSide from './assets/card-back-side.jpg';

import s from './styles.module.css';

const PokemonCard = ({ keyId, id, name, img, type, values, isActive, writeDB, minimize, className }) => {
  const handleClick = () => {
    console.log(`name: ${name}, ${id} ${keyId}`);
    writeDB && writeDB(keyId, isActive);
  };
  return (
    <div className={s.root} onClick={handleClick}>
      <div className={cn(className, s.pokemonCard, {[s.active]: isActive, [s.deactive]: isActive === false})}>
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
          <div className={cn(s.wrap, s.back)}>
            <img src={cardBackSide} alt="Сard Backed" />
          </div>
        </div>

      </div>
    </div>
  );};

export default PokemonCard;