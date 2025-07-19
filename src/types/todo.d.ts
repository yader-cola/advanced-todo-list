export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  text: string;
  date: string;
  priority: Priority;
  isEditing?: boolean;
  lastState?: { text: string; priority: Priority };
}

export interface AddTodoProps {
  handleAddTodo: (text: string, priority: Priority) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string, newPriority: Priority) => void;
  onStartEditing: (id: number | null) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  index: number;
  onEditTodo: (id: number, newText: string, newPriority: Priority) => void;
  onStartEditing: (id: number | null) => void;
}

export interface MySelectProps {
  priority: Priority;
  setPriority: (priority: Priority) => void;
}

export type SortField = 'date' | 'priority';
export type SortDirection = 'asc' | 'desc';

export interface SortControlsProps {
  onChange: (field: SortField, direction: SortDirection) => void;
}

export interface SortConfigState {
  field: 'date' | 'priority';
  direction: 'asc' | 'desc';
}
