import { type FC } from 'react';
import TodoItem from '../TodoItem/TodoItem.tsx';
import type { Todo, TodoListProps } from '../../types/todo';
import styles from './TodoList.module.css';

const TodoList: FC<TodoListProps> = ({ todos, onDeleteTodo }) => {
  return (
    <div className={styles.todoList}>
      {todos.map((todo: Todo, index: number) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDeleteTodo} index={index + 1} />
      ))}
    </div>
  );
};

export default TodoList;
