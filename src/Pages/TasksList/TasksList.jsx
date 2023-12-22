import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Task from "./Task";
import { useEffect, useState } from "react";

const TasksList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [todoTask, setTodoTask] = useState([]);
  const [ongoingTask, setOngoingTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  // Queries
  const {
    data: tasks,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const result = await axiosSecure(`/tasks?email=${user?.email}`);
      return result.data;
    },
  });

  // Update state based on task status
  useEffect(() => {
    if (tasks) {
      const todoTasks = tasks.filter((task) => task.status === "To Do");
      const ongoingTasks = tasks.filter((task) => task.status === "On Going");
      const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
      );

      setTodoTask(todoTasks);
      setOngoingTask(ongoingTasks);
      setCompletedTask(completedTasks);
    }
  }, [tasks]);

  return (
    <div className="overflow-x-auto w-[350px] md:w-[700px] xl:w-full px-2">
      <h1 className="text-2xl font-bold">To Do</h1>
      <div className="flex items-center justify-start gap-2">
        {!isLoading &&
          todoTask.map((task, idx) => <Task task={task} key={idx}></Task>)}
      </div>

      {/* Repeat similar blocks for "On Going" and "Completed" */}
      <h1 className="text-2xl font-bold">On Going</h1>
      <div className="flex items-center justify-start gap-2">
        {!isLoading &&
          ongoingTask.map((task, idx) => <Task task={task} key={idx}></Task>)}
      </div>

      <h1 className="text-2xl font-bold">Completed</h1>
      <div className="flex items-center justify-start gap-2">
        {!isLoading &&
          completedTask.map((task, idx) => <Task task={task} key={idx}></Task>)}
      </div>
    </div>
  );
};

export default TasksList;
