import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Task from "./Task";
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const TaskItem = ({ task, status, moveTask, refetch }) => {
  const [, ref] = useDrag({
    type: "TASK",
    item: { id: task._id, status },
  });

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (draggedItem) => {
      if (draggedItem.id !== task._id || draggedItem.status !== status) {
        moveTask(draggedItem.id, status);
        draggedItem.id = task._id;
        draggedItem.status = status;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      <Task refetch={refetch} task={task} />
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  moveTask: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

const Placeholder = ({ status, moveTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    hover: (draggedItem) => {
      if (draggedItem.status !== status) {
        moveTask(draggedItem.id, status);
        draggedItem.status = status;
      }
    },
  });

  return (
    <div
      className="w-[300px] h-[210px] flex justify-start items-center"
      ref={(node) => drop(node)}
    >
      Drop here to update status
    </div>
  );
};

Placeholder.propTypes = {
  status: PropTypes.string.isRequired,
  moveTask: PropTypes.func.isRequired,
};

const TasksList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [todoTasks, setTodoTasks] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const {
    data: fetchedTasks,
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

  useEffect(() => {
    if (fetchedTasks) {
      const todoTasks = fetchedTasks.filter((task) => task.status === "To Do");
      const ongoingTasks = fetchedTasks.filter(
        (task) => task.status === "On Going"
      );
      const completedTasks = fetchedTasks.filter(
        (task) => task.status === "Completed"
      );

      setTodoTasks(todoTasks);
      setOngoingTasks(ongoingTasks);
      setCompletedTasks(completedTasks);
    }
  }, [fetchedTasks]);

  const moveTask = (taskId, toStatus) => {
    // Make the API call to update the task status
    axiosSecure
      .patch(`/tasks/${taskId}`, { status: toStatus })
      .then(() => {
        toast.success("Task status updated");
        refetch();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Task status is not updated");
      });
  };

  return (
    <div className="overflow-x-auto w-[350px] md:w-[700px] lg:min-w-[600px] xl:w-full px-2">
      <DndProvider backend={HTML5Backend}>
        <h1 className="text-2xl font-bold">To Do</h1>
        <div className="flex items-center justify-start gap-2">
          {!isLoading &&
            todoTasks.map((task) => (
              <TaskItem
                refetch={refetch}
                key={task._id}
                task={task}
                status="To Do"
                moveTask={moveTask}
              />
            ))}
          <Placeholder status="To Do" moveTask={moveTask} />
        </div>
        <hr className="w-full mt-4 border-2 border-black" />
        {/* Repeat similar blocks for "On Going" */}
        <h1 className="text-2xl font-bold">On Going</h1>
        <div className="flex items-center justify-start gap-2">
          {!isLoading &&
            ongoingTasks.map((task) => (
              <TaskItem
                refetch={refetch}
                key={task._id}
                task={task}
                status="On Going"
                moveTask={moveTask}
              />
            ))}
          <Placeholder status="On Going" moveTask={moveTask} />
        </div>
        <hr className="w-full mt-4 border-2 border-black" />

        {/* Completed column with a placeholder */}
        <h1 className="text-2xl font-bold">Completed</h1>
        <div className="flex items-center justify-start gap-2">
          {!isLoading &&
            completedTasks.map((task) => (
              <TaskItem
                refetch={refetch}
                key={task._id}
                task={task}
                status="Completed"
                moveTask={moveTask}
              />
            ))}
          <Placeholder status="Completed" moveTask={moveTask} />
        </div>
      </DndProvider>
    </div>
  );
};

export default TasksList;
