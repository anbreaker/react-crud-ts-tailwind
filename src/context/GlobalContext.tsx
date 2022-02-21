import { createContext, useReducer } from 'react';
import { v4 } from 'uuid';

import { appReducer } from './AppReducer';
import { task } from '../interface/tasks.interface';

const initialState: any = {
  tasks: [
    {
      id: '1',
      title: 'Test',
      description: 'Desc',
      done: false,
    },
    {
      id: '2',
      title: 'Test 2',
      description: 'Desc 2',
      done: true,
    },
  ],
  addTask: {},
};

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addTask = (task: task) => {
    dispatch({
      type: 'ADD_TASK',
      payload: { ...task, id: v4(), done: false },
    });
  };

  const deleteTask = (id: string) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: id,
    });
  };

  const updateTask = (task: task) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: task,
    });
  };

  const toggleTaskDone = (id: string) =>
    dispatch({ type: 'TOGGLE_TASK_DONE', payload: id });

  return (
    <GlobalContext.Provider
      value={{ ...state, addTask, deleteTask, updateTask, toggleTaskDone }}>
      {children}
    </GlobalContext.Provider>
  );
};
