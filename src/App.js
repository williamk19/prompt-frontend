import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ErrorPage from "./Pages/ErrorPage";
import axios from "axios";
import Project from './Pages/Project';
import TaskForm from './Pages/TaskForm';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
      <Route
        path="/register"
        element={<Register />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/dashboard"
        element={<Dashboard />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/project"
        element={<Project />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/create"
        element={<TaskForm />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/task/:taskId"
        element={<TaskForm />}
        errorElement={<ErrorPage />}
      />
    </Routes>
  );
};

export default App;
