import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Mission {
  id: number;
  title: string;
  difficulty: number;
  completed: boolean;
}

// כאן את שמה את הערכים ההתחלתיים שלך!
const initialState: Mission[] = [
  { id: 1, title: "Run 2 times a week", difficulty: 7, completed: false },
  { id: 2, title: "To do 2 trainings in a week", difficulty: 5, completed: false },
  { id: 3, title: "To visit Grandpa twice a week", difficulty: 4, completed: false }
];

export const missionSlice = createSlice({
  name: 'missions',
  initialState, 
  reducers: {
    addMission: (state, action: PayloadAction<{ title: string; difficulty: number }>) => {
      state.push({
        id: Date.now(),
        title: action.payload.title,
        difficulty: action.payload.difficulty,
        completed: false
      });
    },
    deleteMission: (state, action: PayloadAction<number>) => {
      return state.filter(mission => mission.id !== action.payload);
    },
  }
});

export const { addMission, deleteMission } = missionSlice.actions;
export default missionSlice.reducer;