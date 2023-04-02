import { useState, useEffect } from 'react';
import { Button } from '../atoms/Button';
import { TodoFilter } from '../molecules/TodoFilter';
import { TodoEditForm } from '../molecules/TodoEditForm';
import { TodoItem } from '../molecules/TodoItem';
import { postTodoAPI } from '../../api/TodoItemAPI';
import { patchTodoAPI } from '../../api/TodoItemAPI';
import { deleteTodoAPI } from '../../api/TodoItemAPI';
import { getTodoAPI } from '../../api/TodoItemAPI';
import { ReactComponent as AddIcon } from '../atoms/image/AddIcon.svg';
import { animateScroll as scroll } from 'react-scroll';

type TodoListProps = {
  id: number;
  name: string;
  isCompleted: boolean;
  isEditing: boolean;
  isNewItem: boolean;
};

type TodoItemAPIProps = {
  id: number;
  name: string;
  isCompleted: boolean;
};

/**
 * Todoリストコンポーネント
 */
export const TodoList: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [todoList, setTodoList] = useState<TodoListProps[]>([]);

  /**
   * Todoアイテム取得（コンポーネントマウント時）
   */
  useEffect(() => {
    const fetchTodoList = async () => {
      const response = await getTodoAPI();
      setTodoList(
        response.map((todo: TodoItemAPIProps) => ({
          id: todo.id,
          name: todo.name,
          isCompleted: todo.isCompleted,
          isEditing: false,
          isNewItem: false
        }))
      );
    };
    fetchTodoList();
  }, []);

  /**
   * Todoアイテムフィルター
   * @param newFilter - 絞り込み種類
   */
  const todoListFilter = (newFilter: string) => {
    setFilter(newFilter);
    let andParam: boolean | undefined;
    switch (newFilter) {
      case 'completed':
        andParam = true;
        break;
      case 'incomplete':
        andParam = false;
        break;
      default:
        break;
    }

    const fetchTodoList = async () => {
      const response = await getTodoAPI(andParam);
      setTodoList(
        response.map((todo: TodoItemAPIProps) => ({
          id: todo.id,
          name: todo.name,
          isCompleted: todo.isCompleted,
          isEditing: false,
          isNewItem: false
        }))
      );
    };
    fetchTodoList();
  };

  /**
   * Todo空アイテム追加処理
   * @param todo - Todoアイテム
   */
  const addTodo = (todo: string) => {
    setTodoList((prevTodos: TodoListProps[]) => [
      ...prevTodos,
      { id: Date.now(), name: todo, isCompleted: false, isEditing: true, isNewItem: true },
    ]);
    scroll.scrollToBottom();
  };

  /**
   * Todoアイテム状態切替処理
   * @param todoId - TodoアイテムID
   */
  const completedTodo = (todoId: number, isCompleted: boolean) => {
    setTodoList((prevTodos: TodoListProps[]) =>
      prevTodos.map((todo: TodoListProps) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    patchTodoAPI(todoId, !isCompleted);
    rendFiltering();
  };

  /**
  * Todoアイテム編集処理
  * @param todoId - TodoアイテムID
  */
  const editTodo = (todoId: number) => {
    setTodoList((prevTodos: TodoListProps[]) =>
      prevTodos.map((todo: TodoListProps) =>
        todo.id === todoId ? { ...todo, isEditing: true } : todo));
  };

  /**
   * Todoアイテム保存処理
   * @param todoId - TodoアイテムID
   * @param newTodo - 新規TodoアイテムID
   * @param isNewItem - 新規アイテム判定
   */
  const saveTodo = (todoId: number, newTodo: string, isNewItem: boolean) => {
    setTodoList((prevTodos: TodoListProps[]) =>
      prevTodos.map((todo: TodoListProps) =>
        todo.id === todoId ? { ...todo, name: newTodo, isEditing: false, isNewItem: false } : todo));
    if (isNewItem) {
      const newTodoItem: TodoItemAPIProps = {
        id: todoId,
        name: newTodo,
        isCompleted: false
      };
      postTodoAPI(newTodoItem);
    } else {
      patchTodoAPI(todoId, newTodo);
    }
    rendFiltering();
  };

  /**
   *  Todo編集キャンセル処理
   *  @param todoId - TodoアイテムID
   *  @param isNewItem - 新規アイテム判定
   */
  const cancelEdit = (todoId: number, isNewItem: boolean) => {
    isNewItem ? (
      setTodoList((prevTodos: TodoListProps[]) =>
        prevTodos.filter((todo: TodoListProps) => todo.id !== todoId))
    ) : (
      setTodoList((prevTodos: TodoListProps[]) =>
        prevTodos.map((todo: TodoListProps) =>
          todo.id === todoId ? { ...todo, isEditing: false } : todo))
    )
  };

  /**
   * Todo削除処理
   * @aparam todoId - TodoアイテムID
   */
  const deleteTodo = (todoId: number) => {
    setTodoList((prevTodos: TodoListProps[]) =>
      prevTodos.filter((todo: TodoListProps) => todo.id !== todoId));
    deleteTodoAPI(todoId);
  };

  /**
  * Todoリストフィルター処理
  */
  const rendFiltering = () => {
    switch (filter) {
      case 'completed':
        setTodoList((prevTodos: TodoListProps[]) =>
          prevTodos.filter((todo: TodoListProps) => todo.isCompleted === true));
        break;
      case 'incomplete':
        setTodoList((prevTodos: TodoListProps[]) =>
          prevTodos.filter((todo: TodoListProps) => todo.isCompleted === false));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <TodoFilter
        filter={filter}
        onFiltering={(newFilter) => todoListFilter(newFilter)} />
      {todoList.map((todo) => (
        todo.isEditing ? (
          <TodoEditForm
            key={todo.id}
            todo={todo.name}
            onCancel={() => cancelEdit(todo.id, todo.isNewItem)}
            onSaveTodo={(newTodo) => saveTodo(todo.id, newTodo, todo.isNewItem)} />
        ) : (
          <TodoItem
            key={todo.id}
            id={todo.id}
            todo={todo.name}
            isCompleted={todo.isCompleted}
            onCheckTodo={() => completedTodo(todo.id, todo.isCompleted)}
            onEditTodo={() => editTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        )))}
      <footer>
        <Button buttonType='add' onClick={() => addTodo('')}>
          <span className='add-icon'><AddIcon /></span>
          タスクを追加する
        </Button>
      </footer>
    </div>
  );
};