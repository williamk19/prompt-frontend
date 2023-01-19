import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../Components/Core/Navbar';
import TaskFormComponent from '../Components/TaskForm/TaskFormComponent';
import useAuth from '../hooks/useAuth';
import { createTask, getAllUser } from '../services/services';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const { authenticated, username, role } = useAuth();
  const [userData, setUserData] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskAssignee, setTaskAssignee] = useState(userData[0]);
  const [status, setStatus] = useState('TODO');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const onSubmitHandler = async () => {
    if (taskTitle.length > 0 && taskDesc.length > 0 && taskAssignee.id !== null) {
      const { res, err } = await createTask(
        authenticated,
        taskTitle,
        taskDesc,
        status,
        taskAssignee.id
      );
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

  useEffect(() => {
    getUserData();
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
