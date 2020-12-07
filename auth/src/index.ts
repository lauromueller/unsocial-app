import dotenv from 'dotenv-safe';
import app from './app';

dotenv.config();

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});
