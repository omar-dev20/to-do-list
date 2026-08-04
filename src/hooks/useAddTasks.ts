import { useState, useEffect } from 'react';
import type { TASKS } from '../types/TASK';

function useTask() {
  const [tasks, setTasks] = useState<TASKS>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, setTasks };
}

export default useTask;