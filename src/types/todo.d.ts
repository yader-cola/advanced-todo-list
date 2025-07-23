export type Priority = 'low' | 'medium' | 'high';

export interface PriorityOption {
  value: Priority;
  label: string;
}

export interface Todo {
  id: string;
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
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, newText: string, newPriority: Priority) => void;
  onStartEditing: (id: string | null) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  index: number;
  onEditTodo: (id: string, newText: string, newPriority: Priority) => void;
  onStartEditing: (id: string | null) => void;
}

export interface MySelectProps {
  priority: Priority;
  setPriority: (priority: Priority) => void;
}

export interface PriorityFilterProps {
  selectedPriorities: Priority[];
  onChange: (priority: Priority[]) => void;
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
