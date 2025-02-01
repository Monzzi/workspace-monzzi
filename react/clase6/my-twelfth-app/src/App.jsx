import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import React from 'react';
import { router } from './router';
import './App.css';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
