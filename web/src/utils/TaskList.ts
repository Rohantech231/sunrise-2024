// src/utils/TaskList.ts

import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Task } from '@/model/Task';

interface TaskListProps {
  tasks: Task[];
  onTaskClick?: (title: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick }) => {
  return (
    <List>
      {tasks.map(task => (
        <ListItem key={task.id} button={!!onTaskClick} onClick={() => onTaskClick && onTaskClick(task.title)}>
          <ListItemText primary={task.title} secondary={task.description} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
