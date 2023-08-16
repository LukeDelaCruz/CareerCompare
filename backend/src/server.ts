import express, { Request, Response } from 'express';
import cors from 'cors';
import { CareerComparisonFormData } from './types/form';
import { TrackingData } from './types/tracking';

const app = express();
const PORT = 4000;

// Middleware to parse JSON requests and enable CORS
app.use(express.json());
app.use(cors());

app.post('/submit-comparison-table-choices', (req: Request, res: Response) => {
  const formData: CareerComparisonFormData = req.body;

  // Logging the form data for demonstration purposes
  console.log('Comparison table choice stored!');
  console.log(formData);

  res.json({ message: 'Form data received!' });
});

app.post('/track-user-data', (req: Request, res: Response) => {
  const userData: TrackingData = req.body;

  // Logging the user data for demonstration purposes
  console.log('User data stored!');
  console.log(userData);

  res.json({ message: 'User data stored!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
