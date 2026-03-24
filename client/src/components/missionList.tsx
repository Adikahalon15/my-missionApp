import { List, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import { MissionItem } from './missionItem';

export const MissionList = () => {
  const missions = useSelector((state: RootState) => state.missions);

  return (
    <Paper sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
      <List>
        {missions.map((m, index) => (
          <MissionItem 
            key={m.id} 
            mission={m} 
            isLast={index === missions.length - 1} 
          />
        ))}
      </List>
    </Paper>
  );
};