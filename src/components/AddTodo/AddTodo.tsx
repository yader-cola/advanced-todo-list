import { type FC, useRef, useState } from 'react';
import styles from './AddTodo.module.css';
import type { AddTodoProps, Priority } from '../../types/todo';
import MySelect from '../MySelect/MySelect.tsx';

const AddTodo: FC<AddTodoProps> = ({ handleAddTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTodo();
  };

  const submitTodo = () => {
    if (inputRef.current?.value.trim()) {
      handleAddTodo(inputRef.current.value, priority);
      inputRef.current.value = '';
      setIsActive(false);
      setPriority('medium');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isActive) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      submitTodo();
    } else if (e.key === 'Escape') {
      setIsActive(false);
    }
  };

  return (
    <form className={styles.formAddTodo} onSubmit={handleSubmit}>
      {isActive ? (
        <div className={styles.activeForm}>
          <input
            className={styles.addTodoInput}
            type="text"
            ref={inputRef}
            autoFocus
            placeholder="Введите текст задачи"
            onKeyDown={handleKeyDown}
          />
          <MySelect priority={priority} setPriority={setPriority} />
          <div className={styles.buttonGroup}>
            <button className={styles.buttonTodo} type="submit">
              Сохранить
            </button>
            <button className={styles.buttonTodo} type="button" onClick={() => setIsActive(false)}>
              Закрыть
            </button>
          </div>
        </div>
      ) : (
        <button
          className={`${styles.buttonTodo} .buttonAdd`}
          type="button"
          onClick={() => setIsActive(true)}
        >
          Добавить задачу
        </button>
      )}
    </form>
  );
};

export default AddTodo;
