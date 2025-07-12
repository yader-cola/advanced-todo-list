import type { FC } from 'react';
import styles from './TodoItem.module.css';
import type { TodoItemProps } from '../../types/todo';

const TodoItem: FC<TodoItemProps> = ({ todo, onDelete, index }) => {
  return (
    <div className={styles.todoItem}>
      <span className={styles.indexTodo}>{index}</span>
      <span className={styles.textTodo}>{todo.text}</span>
      <span className={styles.dateTodo}>{new Date(todo.date).toLocaleString()}</span>
      <button className={styles.deleteButton} onClick={() => onDelete(todo.id)}>
        &#10060;
      </button>
    </div>
  );
};

export default TodoItem;
