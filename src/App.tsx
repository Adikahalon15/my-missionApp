import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { type RootState } from './store/index'; 
import { addMission , deleteMission} from './store/missionSlice';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react'; 

// ספריות עזר של MUI 
import { Paper, TextField, Button, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

// הגדרת סוג הנתונים של משימה חדשה
interface IFormInput {
  missionTitle: string;
  difficulty: number;
}

function App() {
  const dispatch = useDispatch();
  
  const missions = useSelector((state: RootState) => state.missions);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>();
  const [darkMode, setDarkMode] = useState(false); // מצב התחלתי - בהיר

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const onSubmit = (data: IFormInput) => {
    dispatch(addMission({ 
      title: data.missionTitle, 
      difficulty: Number(data.difficulty) 
    }));
    reset(); 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
  
      <Button variant="outlined" 
        onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
        </Button>

      <Paper sx={{ p: 3, width: '100%', maxWidth: 400 }}>
        <h3>Add New Mission</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField 
              label="Mission Title" 
              variant="outlined" 
              fullWidth
              {...register("missionTitle", { required: "Title is required" })}
              error={!!errors.missionTitle}
              helperText={errors.missionTitle?.message}
            />
            <TextField 
              label="Difficulty (1-10)" 
              type="number" 
              variant="outlined" 
              fullWidth
              {...register("difficulty", { required: true, min: 1, max: 10 })}
              error={!!errors.difficulty}
              helperText={errors.missionTitle?.message}
            />
            <Button type="submit" variant="contained" fullWidth>
              Add Mission
            </Button>
          </Box>
        </form>
      </Paper>

      <Paper sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
        <List>
        {missions.map((m, index) => (
          <Box key={m.id}>
            <ListItem
              secondaryAction={ // זו דרך של MUI להוסיף כפתור בצד ימין של השורה
                <Button 
                  variant="outlined" 
                  color="error" 
                  size="small"
                  onClick={() => dispatch(deleteMission(m.id))}
                >
                  Delete
                </Button>
              }
            >
              <ListItemText 
                primary={m.title} 
                secondary={`Difficulty: ${m.difficulty}`} 
              />
            </ListItem>
            {index < missions.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>

    </Box>
    </ThemeProvider>
  );
}

export default App;