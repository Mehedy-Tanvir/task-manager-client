const Task = ({ task }) => {
  // Function to format the deadline to a readable date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
    </div>
  );
};

export default Task;
