import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { indexRouter } from './routers/indexRouter.js';
import { createRouter } from './routers/createRouter.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.use('/', indexRouter);
app.use('/', createRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message);
});

