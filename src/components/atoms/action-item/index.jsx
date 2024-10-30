import './style.scss';

export const ActionItem = ({ action }) => {
  return (
    <ul className='action-item'>
      <li><strong>Attack:</strong> {action.pokemon.name}</li>
      <li><strong>Damage:</strong> {action.damage}</li>
      <li><strong>Opponent HP:</strong> {action.opponentHp}</li>
    </ul>
  )
}