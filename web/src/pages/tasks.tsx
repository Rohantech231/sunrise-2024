// src/pages/tasks.tsx

import React, { useEffect, useState } from 'react';
import { initializeTasks, getActiveTasks, completeTask, createTask, updateTask, deleteTask, getCompletedTasks } from '@/modules/taskManager';
import { Container, Typography, Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box, CssBaseline, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '@/components/Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
});

const TaskManager = () => {
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskGroup, setNewTaskGroup] = useState(1);
  const [newTaskPersona, setNewTaskPersona] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    initializeTasks();
    setActiveTasks(getActiveTasks());
    setCompletedTasks(getCompletedTasks());
  }, []);

  const handleCompleteTask = (title: string) => {
    completeTask(title);
    setActiveTasks(getActiveTasks());
    setCompletedTasks(getCompletedTasks());
  };

  const handleCreateTask = () => {
    createTask(newTaskTitle, newTaskDescription, newTaskPersona, newTaskGroup);
    setActiveTasks(getActiveTasks());
    setOpenCreateDialog(false);
  };

  const handleUpdateTask = () => {
    if (selectedTask) {
      updateTask(selectedTask.id, { title: newTaskTitle, description: newTaskDescription, group: newTaskGroup, persona: newTaskPersona });
      setActiveTasks(getActiveTasks());
      setSelectedTask(null);
      setOpenCreateDialog(false);
    }
  };

  const handleDeleteTask = (id: number) => {
    deleteTask(id);
    setActiveTasks(getActiveTasks());
    setCompletedTasks(getCompletedTasks());
  };

  const openEditDialog = (task) => {
    setSelectedTask(task);
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description);
    setNewTaskGroup(task.group);
    setNewTaskPersona(task.persona);
    setOpenCreateDialog(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex">
        <Sidebar />
        <Container>
          <Typography variant="h4" gutterBottom>Task Manager</Typography>

          <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>Create Task</Button>

          <Typography variant="h6" gutterBottom>Active Tasks</Typography>
          <List>
            {activeTasks.map(task => (
              <ListItem key={task.id}>
                <ListItemText primary={task.title} secondary={task.description} />
                <IconButton onClick={() => handleCompleteTask(task.title)} color="primary">
                  <DoneIcon />
                </IconButton>
                <IconButton onClick={() => openEditDialog(task)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteTask(task.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" gutterBottom>Completed Tasks</Typography>
          <List>
            {completedTasks.map(task => (
              <ListItem key={task.id}>
                <ListItemText primary={task.title} secondary={task.description} />
              </ListItem>
            ))}
          </List>

          <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
            <DialogTitle>{selectedTask ? 'Update Task' : 'Create a New Task'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Fill in the details of the {selectedTask ? 'task to update' : 'new task'}.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Task Title"
                fullWidth
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Task Description"
                fullWidth
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Task Group"
                fullWidth
                type="number"
                value={newTaskGroup}
                onChange={(e) => setNewTaskGroup(Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Task Persona"
                fullWidth
                value={newTaskPersona}
                onChange={(e) => setNewTaskPersona(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCreateDialog(false)} color="primary">Cancel</Button>
              <Button onClick={selectedTask ? handleUpdateTask : handleCreateTask} color="primary">
                {selectedTask ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default TaskManager;
