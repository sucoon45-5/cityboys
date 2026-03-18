# Implementation Plan - City Boy Movement Website

Building a modern, responsive political movement website for City Boy Movement, optimized for cPanel shared hosting.

## Proposed Changes

### Project Structure
Organizing the project for cPanel compatibility, where the Node.js app can be managed via "Setup Node.js App" or placed in a directory with a passenger-like setup.

- `public/`: Static frontend assets (HTML, CSS, images, JS). This is where the cPanel "document root" usually points or where static files are served from.
- `src/`: Backend source code.
    - `config/`: Database and environment configuration.
    - `controllers/`: Request handling logic.
    - `models/`: Database interactions.
    - `routes/`: API route definitions.
    - `middleware/`: Authentication and other logic.
    - `utils/`: Helper functions (QR generation, mailing).
- `server.js`: Main entry point.

### Database Schema [MySQL]
Tables to be created:
- `users`: Admin and authenticated users (id, name, email, password, role).
- `members`: Registered movement members (id, first_name, surname, phone, state, lga, ward, address, party, member_id, qr_code, status).
- `events`: (id, title, date, location, description, image).
- `news`: (id, title, content, image, date).
- `projects`: (id, title, description, category, progress, image).
- `gallery`: (id, image_url, category).
- `donations`: (id, amount, donor_name, purpose, date, status).

### Backend Development
- **Express.js Server**: RESTful API.
- **JWT Auth**: Secure routes for admin/member dashboard.
- **QR Code Generation**: Using `qrcode` package to generate membership cards.

### Frontend Development
- **Vanilla Tech**: HTML5, Tailwind (CDN), GSAP.
- **Animations**: GSAP for scroll indicators, parallax, and card reveals.
- **Responsive**: Mobile-first design focusing on accessibility.

## Verification Plan

### Automated Tests
- Postman/Fetch tests for API endpoints.
- Validation for registration form fields.

### Manual Verification
- Visual inspection of GSAP animations.
- Testing responsive layout on various screen sizes.
- Testing membership registration flow and QR code generation.
- Mocking payment gateway responses (Paystack/Stripe).
