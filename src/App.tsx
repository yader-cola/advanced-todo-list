import './App.css';
import { type FC, useEffect, useState } from 'react';
import TodoList from './components/TodoList/TodoList.tsx';
import AddTodo from './components/AddTodo/AddTodo.tsx';
import type { Priority, Todo } from './types/todo';

const STORAGE_KEY = 'todos';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storageSaved = localStorage.getItem(STORAGE_KEY);
    return storageSaved ? JSON.parse(storageSaved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text: string, priority: Priority) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      date: new Date().toISOString(),
      priority: priority,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: number, newText: string, newPriority: Priority) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText,
              priority: newPriority,
              date: new Date().toISOString(),
              isEditing: false,
            }
          : todo,
      ),
    );
  };

  const startEditing = (id: number | null) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : { ...todo, isEditing: false },
      ),
    );
  };

  return (
    <>
      <h1>Advanced Todo List</h1>
      <div className="todoApp">
        <TodoList
          todos={todos}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
          onStartEditing={startEditing}
        />
        <AddTodo handleAddTodo={handleAddTodo} />
      </div>
    </>
  );
};

export default App;
