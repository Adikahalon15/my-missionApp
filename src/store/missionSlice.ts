import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Mission {
  id: string;
  title: string;
  difficulty: number;
  completed: boolean;
}

const initialState: Mission[] = [
  { id: uuidv4(), title: "Run 2 times a week", difficulty: 7, completed: false },
  { id: uuidv4(), title: "To do 2 trainings in a week", difficulty: 5, completed: false },
  { id: uuidv4(), title: "To visit Grandpa twice a week", difficulty: 4, completed: false }
];

export const missionSlice = createSlice({
  name: 'missions',
  initialState, 
  reducers: {
    addMission: (state, action: PayloadAction<{ title: string; difficulty: number }>) => {
      state.push({
        id: uuidv4(),
        title: action.payload.title,
        difficulty: action.payload.difficulty,
        completed: false
      });
    },
    deleteMission: (state, action: PayloadAction<string>) => {
      return state.filter(mission => mission.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const mission = state.find(m => m.id === action.payload);
      if (mission) {
        mission.completed = !mission.completed; 
  }}}
});

export const { addMission, deleteMission, toggleComplete } = missionSlice.actions;
export default missionSlice.reducer;