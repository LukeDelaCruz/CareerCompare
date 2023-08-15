import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

// Middleware to parse JSON requests and enable CORS
app.use(express.json());
app.use(cors());

// Define an interface for the expected form data
interface FormData {
  email: string;
  phone: string;
  selectedProducts: string;
}

// Route to handle form submission
app.post('/submitComparisonTableChoices', (req: Request, res: Response) => {
  const formData: FormData = req.body;

  // Logging the form data for demonstration purposes
  console.log(formData);

  res.json({ message: 'Form data received!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
