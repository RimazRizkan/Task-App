import { Button, TextField, Typography, Container, Stack, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Task = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDate, setEditingDate] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [editingStatus, setEditingStatus] = useState('');


  //Retrieve tasks
  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:3001/tasks/task");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Not able to retrieve tasks", error)
    }
  }


  useEffect(() => {
    getTasks();
  }, [])


  //Create a task
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/tasks/create-task" , {title, date, description, status});
      setTitle('');
      setDate('');
      setDescription('');
      setStatus('');
    } catch(error) {
      console.error("Failed to create task", error);
    }
    getTasks();
  }


  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/delete-task/${taskId}`);
      getTasks();
    } catch (error) {
      console.error("Not able to retrieve tasks", error)
    }
  }

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  }


  
  // Edit task
  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditingTitle(task.title);
    setEditingDate(task.date);
    setEditingDescription(task.description);
    setEditingStatus(task.status);
  };


  
  // Save edited task
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3001/tasks/edit-task/${editingTaskId}`,
        {
          title: editingTitle,
          date: editingDate,
          description: editingDescription,
          status: editingStatus,
        }
      );
      setEditingTaskId('');
      setEditingTitle('');
      setEditingDate('');
      setEditingDescription('');
      setEditingStatus('');
      getTasks();
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  return (
    <div>
      <Container maxWidth="m">
        <Typography variant="h3" component="h1">
          Task Manager App
        </Typography>
        <br/><br/><br/><br/>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
          <TextField type='text' label='Title' name='title' value={title} onChange={(event) => setTitle(event.target.value)}/>
          <TextField type='date' name='date' value={date} onChange={(event) => setDate(event.target.value)}/>
          <TextField type='text' label='Description' name='description' value={description} onChange={(event) => setDescription(event.target.value)}/>
          <TextField type='text' label='Status' name='status' value={status} onChange={(event) => setStatus(event.target.value)}/>
          <Button onClick={handleSubmit} variant='contained'>Add</Button>
        </Box>
         
        <br/><br/><br/><br/><br/>



        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                {editingTaskId === task._id ? (
                  <>
                    <TableCell align="right">
                      <TextField
                        type="text"
                        value={editingTitle}
                        onChange={(event) =>
                          setEditingTitle(event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="date"
                        value={editingDate}
                        onChange={(event) =>
                          setEditingDate(event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="text"
                        value={editingDescription}
                        onChange={(event) =>
                          setEditingDescription(event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="text"
                        value={editingStatus}
                        onChange={(event) =>
                          setEditingStatus(event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={2}>
                        <Button onClick={handleSave} variant="contained">
                          Save
                        </Button>
                        <Button
                          onClick={() => setEditingTaskId('')}
                          variant="contained"
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell align="right">{task.title}</TableCell>
                    <TableCell align="right">{task.date}</TableCell>
                    <TableCell align="right">{task.description}</TableCell>
                    <TableCell align="right">
                    <Typography style={{ color: task.status === 'completed' ? 'green' : 'red' }}>{task.status}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={2}>
                        <Button
                          onClick={() => handleDelete(task._id)}
                          variant="contained"
                          color="warning"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => handleEdit(task)}
                          variant="contained"
                        >
                          Edit
                        </Button>
                      </Stack>
                    </TableCell>
                  </>
                )}
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}


export default Task
