import React from 'react'
import Sidebar from './Sidebar';
import SignUp from './SignUp';
import Login from './Login';
import Admin from './Admin';
import Students from './Students';
import ManageUsers from './ManageUsers';
import AddProject from './AddProject';
import Allproject from './Allproject';
import Myproject from './Myproject';
import MangeProject from './MangeProject';
import Editproject from './Editproject';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
    {
      path: "/Sidebar",
      element: <Sidebar/>
    },
    {
      path: "/",
      element: <SignUp/>
    },
    {
      path: "/Login",
      element: <Login/>
    },
    {
      path: "/Admin",
      element: <Admin/>
    },
    {
      path: "/Students/",
      element: <Students/>
    },
    {
      path: "/ManageUsers",
      element: <ManageUsers/>
    },
    {
      path: "/AddProject",
      element: <AddProject/>
    },
    {
      path: "/MangeProject",
      element: <MangeProject/>
    },
    {
      path: "/Allproject",
      element: <Allproject/>
    },
    {
      path: "/Myproject",
      element: <Myproject/>
    },
    {
      path: "/Editproject",
      element: <Editproject/>
    },
  ]);
  
const Router = () => {
  return (
    <RouterProvider router={router} />  )
}

export default Router