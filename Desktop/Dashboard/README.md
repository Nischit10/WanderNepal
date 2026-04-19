# Wander Nepal Dashboard

A beautiful, modern dashboard for the Wander Nepal platform. The design features a split-screen layout with the login form on the left and an attractive user dashboard on the right.

## Project Structure

```
Dashboard/
├── index.html       # Main HTML file with the complete page structure
├── styles.css       # All styling (follows BEM methodology)
├── script.js        # JavaScript for interactivity and animations
└── README.md        # This file
```

## Features

### Left Side - Login Form
- Clean, modern login interface
- Email and password input fields
- "Forgot Password" link
- Google OAuth button
- Sign-up link
- Footer links (Privacy, Terms, Contact)
- Responsive design
- Input validation
- Password visibility toggle

### Right Side - Dashboard
- **Dashboard Header** with current date and notifications
- **Welcome Card** with mountain imagery and greeting
- **Statistics Grid** displaying:
  - Peaks Climbed (12)
  - Distance Covered (284 km)
  - Hours Trekked (156h)
  - Badges Earned (8)
- **Recent Activity Section** showing:
  - Completed treks
  - In-progress expeditions
  - Bookmarked adventures
- Beautiful gradient backgrounds
- Smooth animations and hover effects
- Mobile-responsive layout

## Color Scheme

```
Primary Blue: #003d82
Secondary Blue: #0052a3
Light Blue: #e8f1f8
Success Green: #10b981
Warning Orange: #f59e0b
Error Red: #ef4444
Background: #f9fafb
White: #ffffff
```

## Typography

- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Heading Sizes**: 32px (main), 24px (sections), 18px (subsections)
- **Body Text**: 14px
- **Labels**: 12px with uppercase styling

## Interactive Features

1. **Password Toggle**: Click the eye icon to show/hide password
2. **Form Validation**: Real-time email validation with visual feedback
3. **Smooth Animations**: Cards fade in with staggered timing
4. **Hover Effects**: Interactive elements have smooth transitions
5. **Keyboard Shortcuts**:
   - Alt+L: Focus on email input
   - Enter: Submit form when in password field
6. **Notification Badge**: Shows unread notification count

## CSS Features

- **CSS Grid**: Responsive stat cards layout
- **CSS Flexbox**: Flexible layouts for header, forms, and lists
- **CSS Gradients**: Beautiful gradient backgrounds
- **CSS Transitions**: Smooth animations (0.3s - 0.6s)
- **CSS Backdrop Filter**: Glassmorphism effect
- **CSS Media Queries**: Mobile responsive (1200px, 768px breakpoints)

## JavaScript Features

- DOM manipulation and event handling
- Form submission with validation
- Real-time input validation
- Dynamic date formatting
- Animation sequencing with setTimeout
- Keyboard event listeners
- Password visibility toggle
- Smooth scroll behavior

## Responsive Breakpoints

- **Desktop**: Full split-screen layout (>1200px)
- **Tablet**: Stacked layout with reduced columns (768px - 1200px)
- **Mobile**: Single column, full-width (< 768px)

## How to Use

1. **Open the dashboard**: Simply open `index.html` in a web browser
2. **Test login form**: Enter any email and password to see the validation and submission
3. **Explore dashboard**: Scroll through the right side to see all dashboard elements
4. **Interact with elements**: 
   - Toggle password visibility
   - Click notification button
   - Hover over stat cards for animations
   - Click "View All" to see more activities

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Font Loading

The design uses system fonts for optimal performance. No external font libraries are required.

## Images

The welcome card uses an external image from Unsplash:
- Mountain preview image (140x140px)
- Loads via CDN for better performance

## Future Enhancements

Potential improvements:
- Backend integration for user authentication
- Database connection for real activity data
- Dark mode toggle
- Internationalization (i18n)
- Advanced charting library (Chart.js, Recharts)
- Mobile app version
- Progressive Web App (PWA) features
- Push notifications
- Social sharing features

## Performance Optimization

- Minimal file sizes
- No external dependencies
- Optimized CSS (no unused styles)
- Efficient JavaScript (debounced events where applicable)
- Lazy loading ready for images
- Mobile-first approach

## Code Quality

- Semantic HTML structure
- BEM CSS naming convention
- Clean, readable JavaScript with comments
- Accessible form elements
- Proper color contrast ratios
- Keyboard navigation support

## License

This project is created for Wander Nepal platform.

## Support

For modifications or questions, refer to the inline comments in:
- `styles.css` - Organized with clear section headers
- `script.js` - Detailed function descriptions
- `index.html` - Semantic markup with comments

---

**Created**: 2026
**Platform**: Wander Nepal - Explore Nepal's majestic peaks.
