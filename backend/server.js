const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 9070;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Ping backend running');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});