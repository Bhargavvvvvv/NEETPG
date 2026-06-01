# NEET PG Preparation Quiz

A React-based quiz application for NEET PG preparation featuring 50 questions (20 Easy, 20 Medium, 10 Hard) with detailed explanations for incorrect answers.

## Features

- 50 carefully curated NEET PG questions
- Difficulty levels: Easy (20), Medium (20), Hard (10)
- Randomized question order
- Immediate feedback with explanations for wrong answers
- Score tracking and percentage calculation
- Review section showing correct/incorrect answers
- Responsive design for mobile and desktop
- Easy to modify questions via JSON file

## Project Structure

```
vite-project/
├── src/
│   ├── data/
│   │   └── questions.json      # Contains all quiz questions
│   ├── components/
│   │   ├── Question.jsx        # Question component
│   │   ├── Question.css        # Styling for questions
│   │   ├── ScoreSummary.jsx    # Score summary component
│   │   └── ScoreSummary.css    # Styling for score summary
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Main application styling
│   └── main.jsx                # Entry point
├── index.html                  # HTML template
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
```

## Local Development

To run the project locally:

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd vite-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173` (or the URL shown in the terminal)

## Building for Production

To create a production build:

```bash
npm run build
```

This will create a `dist` directory with optimized files ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

## Deploying to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project directory:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your project

### Option 2: Using GitHub Integration

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project and configure the build settings
5. Click "Deploy"

### Vercel Configuration (if needed)

Vercel will automatically detect the Vite project and use the correct build settings. However, if you need to customize:

- Build Command: `npm run build`
- Output Directory: `dist`

## Modifying Questions

All questions are stored in `src/data/questions.json`. To modify or add questions:

1. Open `src/data/questions.json`
2. Each question object has:
   - `id`: Unique identifier (number)
   - `question`: The question text (string)
   - `options`: Array of 4 answer options (strings)
   - `correctAnswer`: Index of correct option (0-3)
   - `explanation`: Detailed explanation for the answer (string)
   - `difficulty`: "easy", "medium", or "hard"

3. Save the file - changes will be reflected immediately when the app reloads

## Example Question Structure

```json
{
  "id": 1,
  "question": "Which of the following is the most common cause of community-acquired pneumonia in adults?",
  "options": [
    "Streptococcus pneumoniae",
    "Haemophilus influenzae",
    "Mycoplasma pneumoniae",
    "Staphylococcus aureus"
  ],
  "correctAnswer": 0,
  "explanation": "Streptococcus pneumoniae is the most common bacterial cause of community-acquired pneumonia in adults, accounting for approximately 30-50% of cases.",
  "difficulty": "easy"
}
```

## Customization

### Changing Colors/Theme

Modify the CSS files in:
- `src/App.css` - Main application styling
- `src/components/Question.css` - Question component styling
- `src/components/ScoreSummary.css` - Score summary component styling

### Adjusting Question Counts

In `src/App.jsx`, modify the `useEffect` hook to change how many questions are selected from each difficulty level:

```javascript
const easyQuestions = data.questions.filter(q => q.difficulty === 'easy').slice(0, 20); // Change 20 to desired number
const mediumQuestions = data.questions.filter(q => q.difficulty === 'medium').slice(0, 20); // Change 20
const hardQuestions = data.questions.filter(q => q.difficulty === 'hard').slice(0, 10); // Change 10
```

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Questions based on NEET PG syllabus
- Built with React and Vite
- Styling inspired by modern UI/UX principles