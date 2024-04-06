import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import User from "./pages/User";
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import Group from "./pages/Group";
import ThreadCreate from "./pages/ThreadCreate";
import ThreadDetails from "./pages/ThreadDetails";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

import GuestRoute from "./routes/GuestRoute";
import PrivateRoute from "./routes/PrivateRoute";
import GroupCreate from "./pages/GroupCreate";
import ThreadsList from "./components/ThreadsList";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const routes = () => [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: GuestRoute(<Signup />),
      },
      {
        path: "/login",
        element: GuestRoute(<Login />),
      },
      {
        path: "/profil",
        element: PrivateRoute(<Profil />),
      },
      {
        path: "/userList",
        element: PrivateRoute(<UserList />),
      },
      {
        path: "/userList/:idUser",
        element: PrivateRoute(<User />),
      },
      {
        path: "/groups",
        element: PrivateRoute(<Group />),
      },
      {
        path: "/groups/:idGroup",
        element: PrivateRoute(<Group />),
      },
      {
        path: "/groups/add",
        element: PrivateRoute(<GroupCreate />),
      },
      {
        path: "/groups/:idGroup/threadCreate",
        element: PrivateRoute(<ThreadCreate />),
      },
      {
        path: "/groups/:idGroup/threadsList",
        element: PrivateRoute(<ThreadsList />),
      },
      {
        path: "/groups/:groupId/threads/:threadId",
        element: PrivateRoute(<ThreadDetails />),
      },
      {
        path: "*", // Catch all
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
