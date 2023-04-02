import { useState } from "react";
import { Button } from "../atoms/Button";
import { Textbox } from "../atoms/Textbox";
import { ReactComponent as CancelIcon } from "../atoms/image/CancelIcon.svg";
import { ReactComponent as SaveIcon } from "../atoms/image/SaveIcon.svg";
import './molecules.css';

type TodoEditFormProps = {
  todo: string;
  onCancel: (e: React.MouseEvent) => void;
  onSaveTodo: (todo: string) => void;
}

/**
 * TODOアイテム編集フォーム
 * @param todo - TODO
 * @param onCancel - 編集キャンセル処理
 * @param onSaveTodo - 保存処理
 * @returns TodoEditFormコンポーネント
 */
export const TodoEditForm: React.FC<TodoEditFormProps> = ({ todo, onCancel, onSaveTodo }) => {
  const [newTodo, setNewTodo] = useState(todo);
  const handleSave = () => {
    newTodo && (onSaveTodo(newTodo))
  };
  return (
    <div className='listcontainer'>
      <span className="block-left">
        <Textbox textboxType="animation" value={newTodo} onChange={setNewTodo} placeholder="タスクを入力" />
      </span>
      <div className="block-right">
        <Button buttonType="icon square-40" onClick={onCancel}><CancelIcon /></Button>
        <Button buttonType="icon square-40" onClick={handleSave}><SaveIcon /></Button>
      </div>
    </div>
  );
};