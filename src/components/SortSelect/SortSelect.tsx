import { type FC, useState } from 'react';
import styles from './SortSelect.module.css';
import type { SortControlsProps, SortDirection, SortField } from '../../types/todo';

const SortSelect: FC<SortControlsProps> = ({ onChange }) => {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleFieldClick = (field: SortField) => {
    const newField = field;
    const newDirection =
      newField === sortField ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'desc';

    setSortField(newField);
    setSortDirection(newDirection);
    onChange(newField, newDirection);
  };

  const handleDirectionClick = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    onChange(sortField, newDirection);
  };

  return (
    <div className={styles.controls}>
      <span className={styles.controlsHeader}>Сортировка</span>
      <div className={styles.sortControls}>
        <div className={styles.fields}>
          <button className={styles.field} onClick={() => handleFieldClick('date')}>
            По дате
          </button>
          <button className={styles.field} onClick={() => handleFieldClick('priority')}>
            По приоритету
          </button>
          <button className={styles.field} onClick={handleDirectionClick}>
            {sortDirection === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortSelect;
