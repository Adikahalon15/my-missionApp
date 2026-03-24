{/* This file responsible for the form feilds */}
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addMission } from '../store/missionSlice';
import { Paper, TextField, Button, Box } from '@mui/material';

interface IFormInput {
  missionTitle: string;
  difficulty: number;
}

export const MissionForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    if (!data.missionTitle.trim()) return;
    dispatch(addMission({ 
      title: data.missionTitle, 
      difficulty: Number(data.difficulty) 
    }));
    reset(); 
  };

  return (
    <Paper sx={{ p: 3, width: '100%', maxWidth: 400 }}>
      <h3>Add New Mission</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            label="Mission Title" 
            {...register("missionTitle", { required: "Title is required" })}
            error={!!errors.missionTitle}
            helperText={errors.missionTitle?.message}
          />
          <TextField 
            label="Difficulty (1-10)" 
            type="number"
            {...register("difficulty", { required: true, min: 1, max: 10 })}
          />
          <Button type="submit" variant="contained">Add Mission</Button>
        </Box>
      </form>
    </Paper>
  );
};