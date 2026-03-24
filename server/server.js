const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });

// A pool of realistic development missions
const missionPool = [
  { title: "Fix Z-Index in Navigation Menu", difficulty: 3 },
  { title: "Debug Redux Persist storage issue", difficulty: 5 },
  { title: "Center a Div using Flexbox", difficulty: 2 },
  { title: "Add form validation to Signup page", difficulty: 4 },
  { title: "Update Material UI to latest version", difficulty: 2 },
  { title: "Optimize useMemo for performance", difficulty: 5 },
  { title: "Style the 'Clear All' button", difficulty: 1 },
  { title: "Perform mobile responsiveness check", difficulty: 3 }
];

console.log('🚀 Server is running on: ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log(' New client connected');

  const sendRandomMission = () => {
    // Pick a random mission from the pool
    const randomIndex = Math.floor(Math.random() * missionPool.length);
    const randomMission = missionPool[randomIndex];

    // Add a "pepper" - current timestamp to see real-time updates
    const timeString = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    const missionToSend = {
      title: `${randomMission.title} [Sent at ${timeString}]`,
      difficulty: randomMission.difficulty
    };

    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(missionToSend));
      console.log('Sent mission:', missionToSend.title);
    }
  };

  // Send the first mission immediately upon connection
  sendRandomMission();

  // Send a random mission every 15 seconds
  const interval = setInterval(sendRandomMission, 15000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});