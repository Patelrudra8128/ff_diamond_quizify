# FF Diamond Quizify - Interactive Quiz Application

A modern, interactive quiz application built with React, TypeScript, Vite, and Tailwind CSS. Test your knowledge with beautifully designed quizzes featuring a glassmorphic UI, smooth animations, and an intuitive user experience.

## ✨ Features

- **Interactive Quiz Interface**: Navigate through questions with a clean, user-friendly interface
- **Multiple Choice Questions**: Each quiz contains questions with 4 answer options (A, B, C, D)
- **Progress Tracking**: Visual progress bar showing your advancement through the quiz
- **Results Display**: Detailed results page with score percentage, performance feedback, and answer review
- **Modern UI Design**: 
  - Glassmorphic design with backdrop blur effects
  - Gradient backgrounds and animated elements
  - Smooth transitions and hover effects
  - Dark theme with purple/pink color scheme
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type-Safe**: Built with TypeScript for better code quality and developer experience

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ff_diamond_quizify
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── QuizCard.tsx    # Quiz card component for quiz list
│   ├── QuizList.tsx    # List of available quizzes
│   ├── QuizQuestion.tsx # Individual question component
│   ├── QuizResult.tsx  # Results display component
│   └── QuizView.tsx    # Main quiz taking interface
├── data/               # Quiz data
│   ├── quizzes.ts      # Quiz data structure
│   └── *.json         # Additional quiz data files
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and animations
```

## 📝 Quiz Data Structure

Each quiz follows this structure:

```typescript
{
  imagePath: string;      // Image path or 'placeholder'
  name: string;           // Quiz name/title
  description: string;     // Quiz description
  questions: [
    {
      question: string;    // Question text
      answer: string;      // Correct answer ('A', 'B', 'C', or 'D')
      A: string;          // Option A text
      B: string;          // Option B text
      C: string;          // Option C text
      D: string;          // Option D text
    }
  ]
}
```

## 🎨 Customization

### Adding New Quizzes

Edit `src/data/quizzes.ts` to add new quizzes following the structure above:

```typescript
export const quizzes: Quiz[] = [
  {
    imagePath: 'placeholder',
    name: 'Your Quiz Name',
    description: 'Quiz description',
    questions: [
      // Add your questions here
    ],
  },
  // Add more quizzes...
];
```

### Styling

The project uses Tailwind CSS. Customize the design by:
- Modifying Tailwind classes in components
- Updating color schemes in `tailwind.config.js`
- Adding custom animations in `src/index.css`

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory, ready to be deployed to any static hosting service.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

Built with modern web technologies for optimal performance and developer experience. The application features:

- Fast hot module replacement (HMR) during development
- Optimized production builds
- Type-safe code with TypeScript
- Modern React patterns and hooks
- Responsive and accessible UI

---

Enjoy testing your knowledge! 🎯
