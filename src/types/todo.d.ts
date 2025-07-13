export interface Todo {
  id: number;
  text: string;
  date: string;
  isEditing?: boolean;
}

export interface AddTodoProps {
  addTodo: (text: string) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string) => void;
  onStartEditing: (id: number) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  index: number;
  onEditTodo: (id: number, newText: string) => void;
  onStartEditing: (id: number) => void;
}
