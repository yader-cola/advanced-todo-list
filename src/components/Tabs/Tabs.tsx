import type { FC } from 'react';
import styles from './Tabs.module.css';
import type { TabsProps } from '../../types/todo';
import { TABS } from '../../constants/constants.ts';

const Tabs: FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.container}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
