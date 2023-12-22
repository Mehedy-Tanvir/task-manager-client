import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AddTasks from "../Pages/AddTasks/AddTasks";
import TasksList from "../Pages/TasksList/TasksList";
import EditTask from "../Pages/EditTask/EditTask";
import Home from "../Pages/Home/Home";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "addTasks",
        element: (
          <PrivateRoutes>
            <AddTasks></AddTasks>
          </PrivateRoutes>
        ),
      },
      {
        path: "tasksList",
        element: (
          <PrivateRoutes>
            <TasksList></TasksList>
          </PrivateRoutes>
        ),
      },
      {
        path: "editTask/:id",
        element: (
          <PrivateRoutes>
            <EditTask></EditTask>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://task-manager-server-azure.vercel.app/tasks/${params?.id}`,
            {
              credentials: "include",
            }
          ),
      },
    ],
  },
]);

export default Routes;
