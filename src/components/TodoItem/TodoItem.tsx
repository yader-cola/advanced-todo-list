import { type FC, useState } from 'react';
import styles from './TodoItem.module.css';
import type { Priority, TodoItemProps } from '../../types/todo';
import MySelect from '../MySelect/MySelect.tsx';

const priorityLabels: Record<Priority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

const TodoItem: FC<TodoItemProps> = ({ todo, onDelete, index, onStartEditing, onEditTodo }) => {
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);

  const handleSave = () => {
    if (editText.trim()) {
      onEditTodo(todo.id, editText, editPriority);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      onStartEditing(null);
    }
  };
  console.log(styles[todo.priority]);

  return (
    <div className={`${styles.todoItem} ${styles[todo.priority]}`}>
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
          <span className={styles.priorityLabel}>{priorityLabels[todo.priority]}</span>
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
