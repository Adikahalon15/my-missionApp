import { useForm, Controller } from 'react-hook-form'; // הוספנו Controller
import { useDispatch } from 'react-redux';
import { addMission } from '../store/missionSlice';
import { Paper, TextField, Button, Box, Typography } from '@mui/material';

interface IFormInput {
  missionTitle: string;
  difficulty: number;
}

export const MissionForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, reset, control, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      missionTitle: '',
      difficulty: 1
    }
  });

  const onSubmit = (data: IFormInput) => {
    // עכשיו data.missionTitle תמיד יהיה מעודכן בגלל ה-Controller
    if (!data.missionTitle || data.missionTitle.trim() === "") return;

    dispatch(addMission({ 
      title: data.missionTitle.trim(), 
      difficulty: Number(data.difficulty) 
    }));

    reset({ missionTitle: '', difficulty: 1 }); // איפוס מפורש לערכים ריקים
  };

  return (
    <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 400, mx: 'auto', mt: 2 }}>
      <Typography variant="h6" gutterBottom align="center">Add New Mission</Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          
          {/* שימוש ב-Controller עבור השדה של הכותרת */}
          <Controller
            name="missionTitle"
            control={control}
            rules={{ required: "Title is required", minLength: 2 }}
            render={({ field }) => (
              <TextField 
                {...field}
                label="Mission Title" 
                variant="outlined"
                fullWidth
                error={!!errors.missionTitle}
                helperText={errors.missionTitle?.message}
              />
            )}
          />

          <Controller
            name="difficulty"
            control={control}
            rules={{ required: true, min: 1, max: 10 }}
            render={({ field }) => (
              <TextField 
                {...field}
                label="Difficulty (1-10)" 
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.difficulty}
                helperText={errors.difficulty ? "1-10 required" : ""}
              />
            )}
          />
          
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
            Add Mission
          </Button>
        </Box>
      </form>
    </Paper>
  );
};