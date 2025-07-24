const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// CORRECTED PATH: Points to the 'browser' sub-folder.
const angularAppDir = path.join(__dirname, '../dist/dashboard/browser');
app.use(express.static(angularAppDir));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(angularAppDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
