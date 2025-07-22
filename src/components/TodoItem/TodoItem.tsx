import { type FC, useEffect, useState } from 'react';
import styles from './TodoItem.module.css';
import type { Priority, TodoItemProps } from '../../types/todo';
import MySelect from '../MySelect/MySelect.tsx';
import { DEFAULT_TIMER, PRIORITY_MAP } from '../../constants/constants.ts';

const TodoItem: FC<TodoItemProps> = ({ todo, onDelete, index, onStartEditing, onEditTodo }) => {
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [showUndo, setShowUndo] = useState(false);
  const [lastState, setLastState] = useState<{ text: string; priority: Priority }>();

  const handleSave = () => {
    if (editText.trim()) {
      setLastState({ text: todo.text, priority: todo.priority });
      onEditTodo(todo.id, editText, editPriority);
      setShowUndo(true);
    }
  };

  const handleUndo = () => {
    if (lastState) {
      onEditTodo(todo.id, lastState.text, lastState.priority);
      setShowUndo(false);
    }
  };

  useEffect(() => {
    if (showUndo) {
      const timer = setTimeout(() => {
        setShowUndo(false);
      }, DEFAULT_TIMER);
      return () => clearTimeout(timer);
    }
  }, [showUndo]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      onStartEditing(null);
    }
  };

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
