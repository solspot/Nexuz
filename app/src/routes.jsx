import React from 'react';
import { useRoutes } from 'react-router-dom';

import Home from 'pages/home/index.jsx';
import Manage from 'pages/manage/index.jsx';
import Display from 'pages/display/index.jsx';

export default function Router() {
  return useRoutes([
    { path: '/', element: <Home /> },
    {
      path: '/manage',
      element: <Manage />
    },
    {
      path: '/manage/:newUsername',
      element: <Manage />
    },
    {
      path: '/:searchedUsername',
      element: <Display />
    }
  ]);
}
