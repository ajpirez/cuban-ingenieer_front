'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useOptimistic,
  startTransition,
  useCallback,
  useState,
} from 'react';
import { Task } from '@/app/interfaces/task';

export type TaskData = {
  id?: string;
  completed: boolean;
  title: string;
};

type TaskContextType = {
  task: TaskData;
  setTask: React.Dispatch<React.SetStateAction<TaskData>>;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  tasks: Task[];
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const initialValue = {
  completed: false,
  title: '',
};

type OptimisticAction = { type: 'update'; id: string; updates: Partial<Task> } | { type: 'delete'; id: string };

export function TaskProvider({ children, initialTasks = [] }: { children: React.ReactNode; initialTasks: Task[] }) {
  const [tasks, setOptimisticTasks] = useOptimistic(initialTasks, (state: Task[], action: OptimisticAction) => {
    switch (action.type) {
      case 'update':
        const taskExists = state.some(task => task.id === action.id);

        return taskExists
          ? state.map(task => (task.id === action.id ? { ...task, ...action.updates } : task))
          : [
              ...state,
              {
                id: action.id,
                title: action.updates.title!,
                completed: action.updates.completed!,
                createdAt: action.updates.createdAt!,
                updatedAt: action.updates.updatedAt!,
              },
            ];
      case 'delete':
        return state.filter(task => task.id !== action.id);
      default:
        return state;
    }
  });

  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      startTransition(() => {
        setOptimisticTasks({ type: 'update', id, updates });
      });
    },
    [setOptimisticTasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      startTransition(() => {
        setOptimisticTasks({ type: 'delete', id });
      });
    },
    [setOptimisticTasks],
  );

  const [task, setTask] = useState<{ completed: boolean; title: string }>(initialValue);
  const [editing, setEditing] = useState(false);

  const value = useMemo(
    () => ({
      editing,
      setEditing,
      task,
      setTask,
      tasks,
      updateTask,
      deleteTask,
    }),
    [deleteTask, editing, task, tasks, updateTask],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
