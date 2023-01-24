import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Core/Navbar';
import TaskFormComponent from '../Components/TaskForm/TaskFormComponent';
import useAuth from '../hooks/useAuth';
import { createTask, deleteTask, getAllUser, getTaskById, updateTask } from '../services/services';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const TaskForm = () => {
  const { authenticated, username, role } = useAuth();
  const [userData, setUserData] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskAssignee, setTaskAssignee] = useState(userData[0]);
  const [taskData, setTaskData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState('TODO');
  let location = useLocation();
  let { taskId } = useParams();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const onSubmitHandler = async () => {
    if (taskTitle.length > 0 && taskDesc.length > 0 && taskAssignee.id !== null) {
      if (!taskData && isEdit === false) {
        const { res, err } = await createTask(
          authenticated,
          taskTitle,
          taskDesc,
          status,
          taskAssignee.id
        );
        navigate('/project');
      } else {
        const { res, err } = await updateTask(
          authenticated,
          taskId,
          taskTitle,
          taskDesc,
          status,
          taskAssignee.id
        );
        navigate('/project');
      }
    }
  };

  const onDeleteHandler = async () => {
    if (isEdit) {
      const { res, err } = await deleteTask(authenticated, taskId);
      navigate('/project');
    }
  };

  const getUserData = async () => {
    const { res, err } = await getAllUser(authenticated);
    const arrData = res.data
      .filter((r) => r.roles[0].roleName === 'ROLE_EMPLOYEE')
      .map((r) => ({
        id: r.id,
        label: r.username
      }));

    setUserData(arrData);
  };

  const getTaskData = async () => {
    if (taskId) {
      const { res, err } = await getTaskById(authenticated, taskId);
      if (err) {
        navigate('/dashboard');
      }
      setTaskData(res.data);
    }
  };

  useEffect(() => {
    if (userData.length > 0 && taskData && role !== 'ROLE_EMPLOYEE') {
      const userDataId = userData.findIndex((u) => u.id === taskData.user.id);
      setTaskTitle(taskData.titleTask);
      setTaskDesc(taskData.descTask);
      setTaskAssignee(userData[userDataId]);
      setStatus(taskData.status);
      setIsEdit(true);
    } else if (userData.length > 0 && taskData && role === 'ROLE_EMPLOYEE') {
      setTaskTitle(taskData.titleTask);
      setTaskDesc(taskData.descTask);
      setTaskAssignee(userData[0]);
      setStatus(taskData.status);
      setIsEdit(true);
    } else {
      setTaskAssignee(userData[0]);
    }
  }, [taskData, userData]);

  useEffect(() => {
    if (location.pathname === '/create') {
      setTaskTitle('');
      setTaskDesc('');
      setTaskAssignee(userData[0]);
      setStatus('TODO');
      setIsEdit(false);
    }
  }, [location]);

  useEffect(() => {
    if (taskData && role === 'ROLE_EMPLOYEE') {
      setUserData([
        { 
          id: taskData.user.id,
          label: taskData.user.username
        },
      ]);
    }
  }, [taskData]);

  useEffect(() => {
    if (role !== 'ROLE_EMPLOYEE') {
      getUserData();
    }
    getTaskData();
  }, []);

  return (
    <>
      {(!authenticated) ? (<Navigate to='/' />) : (
        <Box>
          <Navbar username={username} role={role} />
          <Container
            maxWidth="md"
            sx={{
              py: 6,
            }}
          >
            <Typography sx={{
              textShadow: '0px 0px 3px rgba(0,0,0,0.25)',
              fontWeight: "700"
            }} mb={3} variant="h5">
              Tambah Pekerjaan
            </Typography>
            <Container
              maxWidth="md"
              sx={{
                py: 2,
              }}
            >
              <TaskFormComponent
                taskTitle={taskTitle}
                taskDesc={taskDesc}
                userData={userData}
                setTaskTitle={setTaskTitle}
                setTaskDesc={setTaskDesc}
                status={status}
                setTaskAssignee={setTaskAssignee}
                taskAssignee={taskAssignee}
                handleChange={handleChange}
                onSubmitHandler={onSubmitHandler}
                onDeleteHandler={onDeleteHandler}
                isEdit={isEdit}
                role={role}
              />
            </Container>
          </Container>
        </Box>
      )}
    </>
  );
};

export default TaskForm;