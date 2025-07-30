import type { Priority, UseTodoItemProps } from '../types/todo';
import { useEffect, useState } from 'react';
import { DEFAULT_TIMER } from '../constants/constants.ts';

export const useTodoItem = ({
  todo,
  onDelete,
  onStartEditing,
  onEditTodo,
  onToggleCompleted,
}: UseTodoItemProps) => {
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [showUndo, setShowUndo] = useState(false);
  const [lastState, setLastState] = useState<{ text: string; priority: Priority }>();

  const handleSave = () => {
    if (editText.trim()) {
      setLastState({ text: todo.text, priority: todo.priority });
      onEditTodo(todo.id, editText, editPriority);
      setShowUndo(true);
    }
  };

  const handleUndo = () => {
    if (lastState) {
      onEditTodo(todo.id, lastState.text, lastState.priority);
      setShowUndo(false);
    }
  };

  useEffect(() => {
    if (showUndo) {
      const timer = setTimeout(() => {
        setShowUndo(false);
      }, DEFAULT_TIMER);
      return () => clearTimeout(timer);
    }
  }, [showUndo]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      onStartEditing(null);
    }
  };
  return {
    editText,
    editPriority,
    showUndo,
    setEditText,
    setEditPriority,
    handleSave,
    handleUndo,
    handleKeyDown,
    onDelete,
    onToggleCompleted,
    onStartEditing,
    todo,
  };
};
