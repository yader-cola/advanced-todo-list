import './App.css';
import { type FC } from 'react';
import TodoList from './components/TodoList/TodoList.tsx';
import AddTodo from './components/AddTodo/AddTodo.tsx';
import SortSelect from './components/SortSelect/SortSelect.tsx';
import PriorityFilter from './components/PriorityFilter/PriorityFilter.tsx';
import DateRangePicker from './components/DateRangePicker/DateRangePicker.tsx';
import Tabs from './components/Tabs/Tabs.tsx';
import { useTodos } from './hooks/useTodos.ts';

const App: FC = () => {
  const {
    todos,
    selectedPriorities,
    activeTab,
    setSelectedPriorities,
    setActiveTab,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    startEditing,
    handleToggleCompleted,
    handleSortChange,
    handleApply,
  } = useTodos();

  return (
    <>
      <div className="todoAppContainer">
        <div className="filtersPanel">
          <PriorityFilter
            selectedPriorities={selectedPriorities}
            onChange={setSelectedPriorities}
          />
          <DateRangePicker onApply={handleApply} />
        </div>
        <div className="todoAppMain">
          <h1>Advanced Todo List</h1>
          <SortSelect onChange={handleSortChange}></SortSelect>
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          <TodoList
            todos={todos}
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
            onStartEditing={startEditing}
            onToggleCompleted={handleToggleCompleted}
          />
          <AddTodo handleAddTodo={handleAddTodo} />
        </div>
      </div>
    </>
  );
};

export default App;
