/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { useState } from 'react';

type Props = {
  onEdit: (todo: Todo, editTitle: string) => Promise<void>;
  onSelect: (todo: Todo) => void;
  isLoading: boolean;
  todo: Todo;
  onDelete?: (id: number) => Promise<void>;
};

export const TodoInfo: React.FC<Props> = ({
  onEdit,
  onSelect,
  isLoading,
  todo,
  onDelete = () => {},
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const HandleEdit = () => {
    setIsEdited(true);
  };

  const HandleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const HandleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo.title === editTitle) {
      setIsEdited(false);
    }

    onEdit(todo, editTitle).then(() => setIsEdited(false));
  };

  const HandleEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEdited(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={() => onSelect(todo)}
        />
      </label>

      {isEdited ? (
        <form onSubmit={HandleEditSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={editTitle}
            onChange={HandleEditTitle}
            onBlur={HandleEditSubmit}
            onKeyDown={HandleEscape}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            onDoubleClick={HandleEdit}
            className="todo__title"
          >
            {todo.title}
          </span>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            className="todo__remove"
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
