import { type FC, useState } from 'react';
import styles from './DateRangePicker.module.css';
import type { DateRangePickerProps } from '../../types/todo';

const DateRangePicker: FC<DateRangePickerProps> = ({ onApply }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApply = () => {
    if (startDate && endDate) {
      onApply(startDate, endDate);
    }
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    onApply('', '');
  };

  return (
    <div className={styles.container}>
      <span className={styles.filterTitle}>Фильтр по дате</span>
      <div className={styles.inputContainer}>
        <label>От:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.dateInput}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>До:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={styles.dateInput}
        />
      </div>
      <div className={styles.button}>
        <button
          onClick={handleApply}
          disabled={!startDate || !endDate}
          className={styles.applyButton}
        >
          Применить
        </button>
        <button
          onClick={handleReset}
          disabled={!startDate && !endDate}
          className={styles.resetButton}
        >
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
