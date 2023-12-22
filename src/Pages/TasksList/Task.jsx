import { MdDelete } from "react-icons/md";
import axios from "axios"; // Import axios for making HTTP requests
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Task = ({ task, refetch }) => {
  const axiosSecure = useAxiosSecure();
  // Function to format the deadline to a readable date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to handle the delete action
  const handleDelete = async () => {
    try {
      // Make a delete request to your server's API endpoint
      await axiosSecure.delete(`/tasks/${task?._id}`).then((res) => {
        refetch();
        console.log(res);
        toast.success("Task was deleted");
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Task was not deleted");
    }
  };

  return (
    <div
      draggable
      className="w-[300px] h-[200px] p-2 rounded-lg shadow-lg mt-2 mb-2 mr-2 ml-2"
    >
      <div className="mt-4">
        <strong>Title:</strong> {task?.title}
      </div>
      <div className="mt-2">
        <strong>Deadline:</strong> {formatDate(task?.deadline)}
      </div>
      <div className="mt-2">
        <strong>Priority:</strong> {task?.priority}
      </div>
      <div className="mt-2">
        <strong>Description:</strong> {task?.description}
      </div>
      <div className="flex items-center justify-end">
        {/* Call handleDelete when the delete icon is clicked */}
        <MdDelete
          className="text-2xl text-red-500 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default Task;
