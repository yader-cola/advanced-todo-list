import { type FC, useState } from 'react';
import styles from './TodoItem.module.css';
import type { TodoItemProps } from '../../types/todo';

const TodoItem: FC<TodoItemProps> = ({ todo, onDelete, index, onStartEditing, onEditTodo }) => {
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEditTodo(todo.id, editText);
    }
  };

  return (
    <div className={styles.todoItem}>
      <span className={styles.indexTodo}>{index}</span>
      {todo.isEditing ? (
        <>
          <input
            className={styles.editInput}
            autoFocus
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button className={`${styles.saveButton} ${styles.button}`} onClick={() => handleSave()}>
            ✔
          </button>
        </>
      ) : (
        <>
          <span className={styles.textTodo}>{todo.text}</span>
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
