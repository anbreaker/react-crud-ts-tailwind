import { task } from '../interface/tasks.interface';

export const appReducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case 'ADD_TASK':
      return {
        tasks: [...state.tasks, payload],
      };

    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter((task: task) => task.id !== payload),
      };

    case 'UPDATE_TASK':
      const updatedTasks = state.tasks.map((task: task) => {
        if (task.id === payload.id) {
          task.title = payload.title;

          task.description = payload.description;
        }
        return task;
      });
      return { tasks: updatedTasks };

    case 'TOGGLE_TASK_DONE':
      return {
        tasks: state.tasks.map((task: task) =>
          task.id === payload ? { ...task, done: !task.done } : task
        ),
      };

    default:
      return state;
  }
};
