import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AddTasks from "../Pages/AddTasks/AddTasks";
import TasksList from "../Pages/TasksList/TasksList";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
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
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "addTasks",
        element: <AddTasks></AddTasks>,
      },
      {
        path: "tasksList",
        element: <TasksList></TasksList>,
      },
    ],
  },
]);

export default Routes;
