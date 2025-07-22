import './App.css';
import { type FC, useEffect, useState } from 'react';
import TodoList from './components/TodoList/TodoList.tsx';
import AddTodo from './components/AddTodo/AddTodo.tsx';
import type { Priority, SortConfigState, SortDirection, SortField, Todo } from './types/todo';
import SortSelect from './components/SortSelect/SortSelect.tsx';

const STORAGE_KEY = 'todos';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storageSaved = localStorage.getItem(STORAGE_KEY);
    return storageSaved ? JSON.parse(storageSaved) : [];
  });
  const [sortConfig, setSortConfig] = useState<SortConfigState>({
    field: 'date',
    direction: 'desc',
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortConfig.field === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    const priorityOrder: Record<Priority, number> = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority];
    const bPriority = priorityOrder[b.priority];
    return sortConfig.direction === 'asc' ? aPriority - bPriority : bPriority - aPriority;
  });

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortConfig({ field, direction });
  };

  const handleAddTodo = (text: string, priority: Priority) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text,
      date: new Date().toISOString(),
      priority: priority,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: string, newText: string, newPriority: Priority) => {
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

  const startEditing = (id: string | null) => {
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
        <div className="controls">
          <span>Сортировка:</span>
          <SortSelect onChange={handleSortChange}></SortSelect>
        </div>
        <TodoList
          todos={sortedTodos}
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
