# Nepal Sanctuary - Login Page

A React-based login page UI for the Nepal Sanctuary project. This is a frontend-only implementation without backend/database integration yet.

## Features

- Clean, modern login interface matching the design
- Email and password input fields
- Google login button (UI only)
- Forgot password link
- Create account link
- Responsive design
- Simple comments throughout the code for learning

## Setup Instructions

1. **Install Node.js** (if not already installed)
   - Go to https://nodejs.org
   - Download and install the LTS version

2. **Navigate to the project folder**
   ```bash
   cd /Users/parshushrestha/Desktop/nepal-sanctuary
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

This will open your browser at `http://localhost:3000`

## Project Structure

```
nepal-sanctuary/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/
│   │   ├── LoginPage.js    # Main login component (written with comments)
│   │   └── LoginPage.css   # Styling for login page
│   ├── App.js              # Root component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Project dependencies
└── README.md               # This file
```

## Current State

✅ **Completed:**
- Beautiful UI matching the Nepal Sanctuary design
- Input fields for email and password
- Form submission handling (logs to console)
- All interactive elements with click handlers
- Responsive design for mobile/tablet
- Well-commented code for learning

❌ **Not Yet Implemented:**
- Backend API integration
- Database storage
- Actual authentication
- OAuth integration for Google login
- Password reset functionality
- Account creation

## Next Steps (When Backend is Ready)

1. Create a backend API (Node.js, Python, etc.)
2. Set up database
3. Update the `handleLogin` function in `LoginPage.js` to call the backend
4. Implement authentication logic
5. Add error handling for login failures

## Notes for Learning

- Each section of code has comments explaining what it does
- The component uses React hooks (`useState`) for managing form inputs
- CSS is organized with comments for each section
- All buttons currently have `console.log()` for debugging - check browser console to see what's happening

Happy coding! 🏔️
