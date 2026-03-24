import { ThemeProvider, createTheme, CssBaseline, Box, Button} from '@mui/material';
import { useState } from 'react';
import { MissionForm } from './components/missionForm';
import { MissionList } from './components/missionList';
import { useSocket } from "./hooks/useSocket";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { status } = useSocket("ws://localhost:8080");
  const theme = createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        
        <Button variant="outlined" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
        </Button>
        <p>Status connection: {status === "open" ? "🟢 connect" : "🔴 disconnect"}</p>
        <MissionForm />
        <MissionList /> 

      </Box>
    </ThemeProvider>
  );
}
export default App;