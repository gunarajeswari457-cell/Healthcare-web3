const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// In-memory Database for Demo Purposes
app.get('/', (req, res) => {
  res.send('Neuro Health Monitoring API is running normally!');
});

const users = [];
const patientTests = {
  'patient@example.com': [
    { id: 1, date: '2026-04-20', reactionTime: 280, stability: 85, coordination: 90, status: 'Normal' },
    { id: 2, date: '2026-04-21', reactionTime: 310, stability: 78, coordination: 85, status: 'Moderate Risk' },
    { id: 3, date: '2026-04-22', reactionTime: 290, stability: 88, coordination: 92, status: 'Normal' },
  ]
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = { id: Date.now(), name, email, password, role };
  users.push(newUser);
  
  if (role === 'patient' && !patientTests[email]) {
    patientTests[email] = [];
  }
  res.status(201).json({ message: 'Registration successful', user: { name, email, role } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  
  // For demo: if patient@example.com is used, just let it pass
  if (email === 'patient@example.com' && role === 'patient') {
    return res.json({ token: 'mock-jwt-token', user: { name: 'Demo Patient', email, role } });
  }
  
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials or role' });
  }
  res.json({ token: 'mock-jwt-token', user: { name: user.name, email: user.email, role: user.role } });
});

// --- PATIENT ROUTES ---
app.get('/api/patients/:email/tests', (req, res) => {
  const { email } = req.params;
  const tests = patientTests[email] || [];
  res.json(tests);
});

app.post('/api/patients/:email/tests', (req, res) => {
  const { email } = req.params;
  const testData = req.body;
  
  if (!patientTests[email]) patientTests[email] = [];
  
  const getStatusInfo = (time) => {
    if (time > 400) return 'High Risk';
    if (time > 300) return 'Moderate Risk';
    return 'Normal';
  };

  const newTest = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    ...testData,
    status: getStatusInfo(Number(testData.reactionTime))
  };
  
  patientTests[email].push(newTest);
  res.status(201).json(newTest);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
