import { Spinner } from "../../atoms/spinner";
import './style.scss';

export const PokemonCard = ({
  pokemon: {_id, name, hp, attack, defense, speed, image, type },
  isActive,
  onClick,
  loading
}) => {
  const active = isActive ? 'card--active' : '';

  return (
    <div className={`card ${active}`} onClick={onClick}>
      {loading && <Spinner/>}
      <div className="card__image">
        <img src={image.hires} alt="pokemon-image" />
      </div>
      <ul className="card__info">
        <li>Name: {name}</li>
        <li>Type: {type}</li>
        <li>HP: {hp}</li>
        <li>Attack: {attack}</li>
        <li>Deffense: {defense}</li>
        <li>Speed: {speed}</li>
      </ul>
    </div>
  )
}