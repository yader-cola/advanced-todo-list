import type { Priority, PriorityOption, Tab } from '../types/todo';

export const STORAGE_KEY = 'todos';

export const PRIORITY_OPTIONS: PriorityOption[] = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
];

export const PRIORITY_MAP: Record<Priority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

export const DEFAULT_TIMER: number = 10000;

export const PRIORITY_FILTER_OPTIONS: Priority[] = ['low', 'medium', 'high'];

export const TABS: Tab[] = [
  { id: 'all', label: 'Все' },
  { id: 'completed', label: 'Выполненные' },
  { id: 'active', label: 'Не выполненные' },
];
