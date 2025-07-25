import { type FC } from 'react';
import styles from './PriorityFilter.module.css';
import type { Priority, PriorityFilterProps } from '../../types/todo';
import { PRIORITY_FILTER_OPTIONS, PRIORITY_MAP } from '../../constants/constants.ts';

const PriorityFilter: FC<PriorityFilterProps> = ({ selectedPriorities, onChange }) => {
  const handlePriorityChange = (priority: Priority) => {
    const newSelected = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];
    onChange(newSelected);
  };

  return (
    <div className={styles.container}>
      <span className={styles.filterTitle}>Фильтр по приоритету</span>
      <div className={styles.checkboxGroup}>
        {PRIORITY_FILTER_OPTIONS.map((priority) => (
          <label key={priority} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selectedPriorities.includes(priority)}
              onChange={() => handlePriorityChange(priority)}
              className={styles.checkboxInput}
            />
            {PRIORITY_MAP[priority]}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PriorityFilter;
