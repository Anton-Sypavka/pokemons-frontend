import { useSelector } from "react-redux";
import { battleActionsSelector } from "../../../store/selectors/battle-selector";
import { ActionItem } from "../../atoms/action-item";
import './style.scss';

export const ActionsList = () => {
  const actions = useSelector(battleActionsSelector);

  return (
    <div className='actions-list'>
      {actions.map(action => <ActionItem key={action._id} action={action} />)}
    </div>
  )
}