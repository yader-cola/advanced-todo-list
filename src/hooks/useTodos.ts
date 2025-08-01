import { useEffect, useMemo, useState } from 'react';
import type {
  ActiveTabState,
  DateFilter,
  Priority,
  SortConfigState,
  SortDirection,
  SortField,
  Todo,
} from '../types/todo';
import { PRIORITY_FILTER_OPTIONS, STORAGE_KEY } from '../constants/constants.ts';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storageSaved = localStorage.getItem(STORAGE_KEY);
    return storageSaved ? JSON.parse(storageSaved) : [];
  });
  const [sortConfig, setSortConfig] = useState<SortConfigState>({
    field: 'date',
    direction: 'desc',
  });
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>(PRIORITY_FILTER_OPTIONS);
  const [dateFilter, setDateFilter] = useState<DateFilter>(null);
  const [activeTab, setActiveTab] = useState<ActiveTabState>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const sortedTodos = useMemo(() => {
    return [...todos]
      .filter((todo) => {
        let statusMatch = true;
        if (activeTab === 'completed') statusMatch = todo.completed;
        if (activeTab === 'active') statusMatch = !todo.completed;

        const priorityMatch = selectedPriorities.includes(todo.priority);

        let dateMatch = true;
        if (dateFilter) {
          const todoDate = new Date(todo.date).getTime();
          const startDate = new Date(dateFilter.start).getTime();
          const endDate = new Date(dateFilter.end).getTime();

          dateMatch = todoDate >= startDate && todoDate <= endDate;
        }

        return statusMatch && priorityMatch && dateMatch;
      })
      .sort((a, b) => {
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
  }, [todos, activeTab, selectedPriorities, dateFilter, sortConfig.field, sortConfig.direction]);

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortConfig({ field, direction });
  };

  const handleAddTodo = (text: string, priority: Priority) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text,
      date: new Date().toISOString(),
      priority: priority,
      completed: false,
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

  const handleApply = (start: string, end: string) => {
    if (start && end) {
      setDateFilter({ start, end });
    } else {
      setDateFilter(null);
    }
  };

  const handleToggleCompleted = (id: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };
  return {
    todos: sortedTodos,
    sortConfig,
    selectedPriorities,
    dateFilter,
    activeTab,
    setSortConfig,
    setSelectedPriorities,
    setDateFilter,
    setActiveTab,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    startEditing,
    handleToggleCompleted,
    handleSortChange,
    handleApply,
  };
};
