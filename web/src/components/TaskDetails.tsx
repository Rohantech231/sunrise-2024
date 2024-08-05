import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';

const TaskDetails = ({ task, onComplete, onDelete, onUpdate }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h5">{task.title}</Typography>
      <Typography variant="body1">{task.description}</Typography>
      <Typography variant="body2">Group: {task.group}</Typography>
      <Typography variant="body2">Persona: {task.persona}</Typography>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="primary" onClick={() => onComplete(task.title)}>
          Complete
        </Button>
        <Button variant="contained" color="secondary" onClick={() => onUpdate(task)}>
          Update
        </Button>
        <Button variant="contained" color="error" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskDetails;
