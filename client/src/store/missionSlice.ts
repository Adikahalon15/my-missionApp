import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Mission {
  id: string;
  title: string;
  difficulty: number;
  completed: boolean;
}

// סטייט ראשוני עם משימות לדוגמה
const initialState: Mission[] = [
  { id: uuidv4(), title: "Run 2 times a week", difficulty: 7, completed: false },
  { id: uuidv4(), title: "Do 2 trainings in a week", difficulty: 5, completed: false },
  { id: uuidv4(), title: "Visit Grandpa twice a week", difficulty: 4, completed: false }
];

export const missionSlice = createSlice({
  name: 'missions',
  initialState, 
  reducers: {
    addMission: (state, action: PayloadAction<{ title: string; difficulty: number }>) => {
      // הוספת משימה חדשה עם ID ייחודי בכל פעם
      state.push({
        id: uuidv4(),
        title: action.payload.title,
        difficulty: action.payload.difficulty,
        completed: false
      });
    },
    deleteMission: (state, action: PayloadAction<string>) => {
      // החזרת מערך חדש ללא המשימה שנמחקה
      return state.filter(mission => mission.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const mission = state.find(m => m.id === action.payload);
      if (mission) {
        mission.completed = !mission.completed; 
      }
    }
  }
});

export const { addMission, deleteMission, toggleComplete } = missionSlice.actions;
export default missionSlice.reducer;