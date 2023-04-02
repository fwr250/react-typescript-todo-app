import { RadioButton } from '../atoms/RadioButton';
import './molecules.css';

type TodoFilterProps = {
  filter: string;
  onFiltering: (filter: string) => void;
}

/**
 * TODOフィルター
 * @param filter - 現在のフィルター種類
 * @param onFiltering - フィルター実行処理
 */
export const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFiltering }) => {


  /**
   * フィルターを変更した際のコールバック関数
   * @param newFilter - 変更後のフィルターの種類
   */
  const handleFilterChange = (newFilter: string) => {
    onFiltering(newFilter);
  };

  return (
    <div className='filtercontainer radio-group '>
      <RadioButton radioButtonType="base" checked={filter === 'all'} onChange={() => handleFilterChange('all')} id="all" name="filter" children="すべて" />
      <RadioButton radioButtonType="base" checked={filter === 'incomplete'} onChange={() => handleFilterChange('incomplete')} id="incomplete" name="filter" children="未完了" />
      <RadioButton radioButtonType="base" checked={filter === 'completed'} onChange={() => handleFilterChange('completed')} id="completed" name="filter" children="完了" />
    </div>
  );
};
