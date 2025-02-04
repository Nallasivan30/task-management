'use client';

import { useEffect, useState } from 'react';
import { getTasks, updateTask, deleteTask } from '../lib/action';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleToggleComplete = async (id: string, isCompleted: boolean) => {
    await updateTask(id, { isCompleted: !isCompleted });
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="p-4 border rounded">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleToggleComplete(task._id, task.isCompleted)}
              className={`p-2 ${task.isCompleted ? 'bg-green-500' : 'bg-gray-500'} text-white rounded`}
            >
              {task.isCompleted ? 'Completed' : 'Mark Complete'}
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}