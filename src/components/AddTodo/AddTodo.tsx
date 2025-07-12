import { type FC, useEffect, useRef, useState } from 'react';
import styles from './AddTodo.module.css';
import type { AddTodoProps } from '../../types/todo';

const AddTodo: FC<AddTodoProps> = ({ addTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTodo();
  };

  const submitTodo = () => {
    if (inputRef.current?.value.trim()) {
      addTodo(inputRef.current.value);
      inputRef.current.value = '';
      setIsActive(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isActive && e.key === 'Escape') {
      setIsActive(false);
    }
    if (e.key === 'Enter') {
      if (!isActive) {
        setIsActive(true);
      }
      submitTodo();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

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
          />
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
