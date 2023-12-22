import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const EditTask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const fetchedTask = useLoaderData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addTask = (entries) => {
    const task = {
      ...entries,
      email: user.email,
    };
    const toastId = toast.loading("Adding task...");
    axiosSecure
      .patch(`/tasks/${fetchedTask?._id}`, task)
      .then((res) => {
        toast.success("Task updated successfully", { id: toastId });
        console.log(res);
        navigate("/dashboard/tasksList");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Task was not updated", { id: toastId });
      });
    console.log(task);
  };
  return (
    <div className="container px-2 mx-auto mt-10 mb-10">
      <Helmet>
        <title>Tasky | Edit Task</title>
      </Helmet>
      <div className="hero">
        <div className="flex-col lg:flex-row-reverse hero-content">
          <div className="max-w-[300px]">
            <img className="" src="/travel-selfie.gif" alt="" />
          </div>

          <div className="flex-shrink-0 border-2 border-yellow-500 shadow-xl card">
            <form
              onSubmit={handleSubmit((data) => addTask(data))}
              className="card-body"
            >
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="md:col-span-2 form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    {...register("title", { required: true })}
                    type="text"
                    placeholder="Task Title"
                    className="input input-bordered"
                    defaultValue={fetchedTask?.title}
                  />
                  {errors.title && (
                    <p className="text-red-500">Title is required.</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Deadline</span>
                  </label>
                  <input
                    {...register("deadline", { required: true })}
                    type="date"
                    placeholder="Deadline"
                    className="input input-bordered"
                    defaultValue={
                      fetchedTask
                        ? new Date(fetchedTask.deadline)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                  />

                  {errors.deadline && (
                    <p className="text-red-500">Deadline is required.</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Priority</span>
                  </label>
                  <input
                    {...register("priority", { required: true })}
                    type="text"
                    placeholder="Low, Moderate, High etc"
                    className="input input-bordered"
                    defaultValue={fetchedTask?.priority}
                  />
                  {errors.priority && (
                    <p className="text-red-500">Priority is required.</p>
                  )}
                </div>
                <div className="md:col-span-2 form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="description"
                    defaultValue={fetchedTask?.description}
                    {...register("description", { required: true })}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500">Description is required.</p>
                  )}
                </div>
              </div>

              <div className="mt-6 form-control">
                <button className="bg-yellow-500 hover:opacity-90 text-white text-xl md:text-3xl h-[60px] px-[20px] rounded-lg">
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
