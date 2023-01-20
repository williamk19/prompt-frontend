import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Core/Navbar';
import TaskFormComponent from '../Components/TaskForm/TaskFormComponent';
import useAuth from '../hooks/useAuth';
import { createTask, getAllUser, getTaskById, updateTask } from '../services/services';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const TaskForm = () => {
  const { authenticated, username, role } = useAuth();
  const [userData, setUserData] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskAssignee, setTaskAssignee] = useState(userData[0]);
  const [taskData, setTaskData] = useState();
  const [status, setStatus] = useState('TODO');
  let location = useLocation();
  let { taskId } = useParams();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const onSubmitHandler = async () => {
    if (taskTitle.length > 0 && taskDesc.length > 0 && taskAssignee.id !== null) {
      if (!taskData) {
        const { res, err } = await createTask(
          authenticated,
          taskTitle,
          taskDesc,
          status,
          taskAssignee.id
        );
        navigate('/project');
      } else {
        const {res, err} = await updateTask(
          authenticated,
          taskId,
          taskTitle,
          taskDesc,
          status,
          taskAssignee.id
        )
        navigate('/project');
      }
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
      setTaskData(res.data);
    }
  };

  useEffect(() => {
    if (userData.length > 0 && taskData) {
      const userDataId = userData.findIndex((u) => u.id === taskData.user.id);
      setTaskTitle(taskData.titleTask);
      setTaskDesc(taskData.descTask);
      setTaskAssignee(userData[userDataId]);
      setStatus(taskData.status);
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
    }
  }, [location])

  useEffect(() => {
    getUserData();
    getTaskData();
  }, []);

  return (
    <>
      {(!authenticated || role === 'ROLE_EMPLOYEE') ? (<Navigate to='/' />) : (
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
              />
            </Container>
          </Container>
        </Box>
      )}
    </>
  );
};

export default TaskForm;