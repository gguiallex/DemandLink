const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => console.log(`Server running or port ${PORT}`));