import type { Priority, PriorityOption } from '../types/todo';

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
