import { type FC } from 'react';
import styles from '../AddTodo/AddTodo.module.css';
import type { Priority, MySelectProps } from '../../types/todo';
import { PRIORITY_OPTIONS } from '../../constants/constants.ts';

const MySelect: FC<MySelectProps> = ({ priority, setPriority }) => {
  return (
    <select
      className={styles.prioritySelect}
      value={priority}
      onChange={(e) => setPriority(e.target.value as Priority)}
    >
      {PRIORITY_OPTIONS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
