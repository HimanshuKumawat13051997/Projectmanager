# Task Manager Frontend

This project is a frontend application for managing projects and tasks, built with React, Vite, and Redux. It provides a user-friendly interface to create, view, and manage projects and tasks efficiently.

## Features

- User authentication (sign in, sign up)
- Project management (create, view projects)
- Task management within projects
- Responsive UI with reusable components
- State management using Redux Toolkit

## Technologies Used

- React 18
- Vite (build tool)
- Redux Toolkit for state management
- React Router (assumed for page navigation)
- ESLint for code linting

## Project Structure

- `src/Components/` - Reusable UI components like navBar, loading spinner, project manager, task manager
- `src/Layout/` - Layout components for different page structures
- `src/pages/` - Page components like signin, signup, main component
- `src/reduxuse/` - Redux store setup, slices, and async actions
- `public/` - Static assets
- `index.html` - Main HTML file
- `vite.config.js` - Vite configuration

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd taskmanagerfront
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000` (or the port shown in the terminal) to view the app.

### Building for Production

To build the app for production, run:

```bash
npm run build
```

The build output will be in the `dist` folder.

### Linting

To run ESLint and check for code issues:

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact the project maintainer.
