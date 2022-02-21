import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalContext';
import { task } from '../interface/tasks.interface';

export const TaskForm = () => {
  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
  });

  const navigate = useNavigate();
  const params = useParams();

  const { addTask, updateTask, tasks } = useContext(GlobalContext);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (task.id) updateTask(task);
    else addTask(task);

    navigate('/');
  };

  useEffect(() => {
    const taksFound = tasks.find((task: task) => task.id.toString() === params.id);

    if (taksFound) setTask(taksFound);
  }, [params.id, tasks]);

  return (
    <div className="flex justify-center items-center h-3/4">
      <form className="bg-gray-900 p-10" onSubmit={handleSubmit}>
        <h2 className="mb-7 text-3xl">
          {task.id ? 'Editing a Task' : 'Creating a Task'}
        </h2>

        <div className="mb-5">
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={task.title}
            placeholder="Write a Title"
            className="py-3 px-4 focus:outline-none focus:text-gray-100 bg-gray-700 w-full"
          />
        </div>

        <div className="mb-5">
          <textarea
            name="description"
            rows={2}
            onChange={handleChange}
            value={task.description}
            className="py-3 px-4 focus:outline-none focus:text-gray-100 bg-gray-700 w-full"
            placeholder="Write a Description"></textarea>
        </div>

        <button className="b-green-600 w-full hover:bg-green-500 py-2 px-4 mt-5">
          {task.id ? 'Edit Task' : 'Creating Task'}
        </button>
      </form>
    </div>
  );
};
