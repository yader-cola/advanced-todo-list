import { type FC } from 'react';
import styles from './TodoItem.module.css';
import type { TodoItemProps } from '../../types/todo';
import MySelect from '../MySelect/MySelect.tsx';
import { PRIORITY_MAP } from '../../constants/constants.ts';
import { useTodoItem } from '../../hooks/useTodoItem.ts';

const TodoItem: FC<TodoItemProps> = ({
  todo,
  onDelete,
  index,
  onStartEditing,
  onEditTodo,
  onToggleCompleted,
}) => {
  const {
    editText,
    editPriority,
    showUndo,
    setEditText,
    setEditPriority,
    handleSave,
    handleUndo,
    handleKeyDown,
  } = useTodoItem({
    todo,
    onDelete,
    onStartEditing,
    onEditTodo,
    onToggleCompleted,
  });

  return (
    <div
      className={`${styles.todoItem} ${styles[todo.priority]} ${todo.completed ? styles.completed : ''}`}
    >
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleCompleted(todo.id)}
          className={styles.completionCheckbox}
        />
      </div>
      <span className={styles.indexTodo}>{index}</span>
      {todo.isEditing ? (
        <>
          <input
            className={styles.editInput}
            autoFocus
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <MySelect priority={editPriority} setPriority={setEditPriority} />
          <button className={`${styles.saveButton} ${styles.button}`} onClick={() => handleSave()}>
            ✔
          </button>
        </>
      ) : (
        <>
          <span className={styles.textTodo}>{todo.text}</span>
          <span className={styles.priorityLabel}>{PRIORITY_MAP[todo.priority]}</span>
          <span className={styles.dateTodo}>{new Date(todo.date).toLocaleString()}</span>
        </>
      )}

      <div className={styles.buttons}>
        {!todo.isEditing && (
          <button
            className={`${styles.editButton} ${styles.button}`}
            onClick={() => onStartEditing(todo.id)}
          >
            ✏️
          </button>
        )}
        {showUndo && (
          <button className={`${styles.undoButton} ${styles.button}`} onClick={handleUndo}>
            ↩️
          </button>
        )}
        <button
          className={`${styles.deleteButton} ${styles.button}`}
          onClick={() => onDelete(todo.id)}
        >
          &#10060;
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
