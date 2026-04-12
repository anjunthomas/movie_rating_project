require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/movies', require('./routes/movies'));
app.use('/ratings', require('./routes/ratings'));
app.use('/countries', require('./routes/countries'));
app.use('/users', require('./routes/users'));
app.use('/reports', require('./routes/reports'));

app.use(require('./middleware/errorHandler'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
