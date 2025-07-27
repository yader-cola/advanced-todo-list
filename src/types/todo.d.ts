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
  completed: boolean;
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
  onToggleCompleted: (id: string) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  index: number;
  onEditTodo: (id: string, newText: string, newPriority: Priority) => void;
  onStartEditing: (id: string | null) => void;
  onToggleCompleted: (id: string) => void;
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

export interface DateRangePickerProps {
  onApply: (start: string, end: string) => void;
}

export type DateFilter = { start: string; end: string } | null;

export interface Tab {
  id: 'all' | 'completed' | 'active';
  label: string;
}

export interface TabsProps {
  activeTab: 'all' | 'completed' | 'active';
  onTabChange: (tab: 'all' | 'completed' | 'active') => void;
}

export type ActiveTabState = 'all' | 'completed' | 'active';
