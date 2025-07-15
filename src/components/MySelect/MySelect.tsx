import { type FC } from 'react';
import styles from '../AddTodo/AddTodo.module.css';
import type { Priority, MySelectProps } from '../../types/todo';

const MySelect: FC<MySelectProps> = ({ priority, setPriority }) => {
  return (
    <select
      className={styles.prioritySelect}
      value={priority}
      onChange={(e) => setPriority(e.target.value as Priority)}
    >
      <option value="low">Низкий</option>
      <option value="medium">Средний</option>
      <option value="high">Высокий</option>
    </select>
  );
};

export default MySelect;
