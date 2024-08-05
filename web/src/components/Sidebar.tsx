// src/components/Sidebar.tsx

import React from 'react';
import { List, ListItem, ListItemText, CssBaseline, Drawer, Typography, Divider } from '@mui/material';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <CssBaseline />
      <Typography variant="h6" noWrap component="div" sx={{ p: 2 }}>
        TaskX
      </Typography>
      <Divider />
      <List>
        {['Home', 'Tasks'].map((text) => (
          <ListItem button key={text} component="a" href={`/${text === 'Home' ? '' : text.toLowerCase().replace(' ', '-')}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
