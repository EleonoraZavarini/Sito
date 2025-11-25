const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(bodyParser.json());

// Servire file statici direttamente dalla root
app.use(express.static(__dirname));

// Funzioni di utilità
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Registrazione
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  let users = readUsers();

  if (users.find(u => u.username === username || u.email === email)) {
    return res.status(400).json({ error: 'Nome utente o email già registrati!' });
  }

  users.push({
    username,
    email,
    password,
    registrationDate: new Date().toISOString()
  });

  writeUsers(users);
  res.json({ success: true });
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ error: 'Credenziali non valide!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
