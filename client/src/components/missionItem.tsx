{/* This file responsible for the buttons and print the missions */}
import { Box, ListItem, ListItemText, Stack, Button, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteMission, toggleComplete } from '../store/missionSlice'; 

interface MissionItemProps {
  mission: {
    id: string; 
    title: string;
    difficulty: number;
    completed: boolean;
  };
  isLast: boolean;
}

export const MissionItem = ({ mission, isLast }: MissionItemProps) => {
  const dispatch = useDispatch();

  return (
    <Box>
      <ListItem
        sx={{ pr: '160px' }}
        secondaryAction={
          <Stack direction="row" spacing={1}>
            <Button 
              variant="outlined" 
              color="error" 
              size="small" 
              onClick={() => dispatch(deleteMission(mission.id))}
            >
              Delete
            </Button>
            <Button
              variant={mission.completed ? "contained" : "outlined"}
              color="success"
              size="small"
              onClick={() => dispatch(toggleComplete(mission.id))}
            >
              {mission.completed ? "Completed" : "Done"}
            </Button>
          </Stack>
        }
      >
        <ListItemText 
          primary={mission.title} 
          secondary={`Difficulty: ${mission.difficulty}`} 
        />
      </ListItem>
      {!isLast && <Divider />}
    </Box>
  );
};