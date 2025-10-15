# Subscription Dashboard

⚠️ **Disclaimer:** This is a student project built for a school assignment focusing on Clean Code principles. It demonstrates the use of the [@hr222sy/subscription-tracker](https://www.npmjs.com/package/@hr222sy/subscription-tracker) module.

A web application for managing and visualizing personal subscriptions. Get a clear overview of your recurring costs, identify unused services, and take control of your subscription spending.

## Core Features

- ✅ Add and manage subscriptions (name, price, frequency, category)
- ✅ Remove subscriptions you no longer need
- ✅ View all subscriptions in a clean interface
- ✅ Automatic calculation of total monthly costs
- ✅ Secure input validation and sanitization
- ✅ Rate limiting and security headers

## Purpose

## Purpose

**For End Users:**  
Subscription Dashboard helps individuals take control of their subscription spending by providing a central hub for all recurring costs. In a world where the average person has 10+ subscriptions, it's easy to lose track of monthly expenses.

**For Developers & Students:**  
This project serves as a practical example of applying Clean Code principles and object-oriented design in a full-stack web application. It demonstrates the integration and use of the [@hr222sy/subscription-tracker](https://www.npmjs.com/package/@hr222sy/subscription-tracker) module in a real application context.

**For Educators:**  
Created as part of the 1dv610 course at Linnaeus University. The project focuses on learning and applying code quality principles, maintainability and software design patterns.

## Screenshots

![Dashboard Overview](docs/images/dashboard.png)
*Main dashboard showing all subscriptions and total monthly cost*

## Links

- 📦 [Using npm module: @hr222sy/subscription-tracker](https://www.npmjs.com/package/@hr222sy/subscription-tracker)
- 🐙 [GitHub repository](https://github.com/HannaRV/subscription-dashboard)

## Table of Contents
- [Core Features](#core-features)
- [Purpose](#purpose)
- [Screenshots](#screenshots)
- [Links](#links)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Security](#security)
- [Requirements](#requirements)
- [License](#license)
- [Author](#author)

## Installation

### Prerequisites
- Node.js >=20.6.0
- npm

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/HannaRV/subscription-dashboard.git
cd subscription-dashboard
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
# Create .env file in root
PORT=3000
NODE_ENV=development
```

4. **Start the server:**
```bash
npm start
```

5. **Open browser:**
```
http://localhost:3000
```

## Usage

### Add a Subscription
1. Fill in subscription details (name, price, frequency, category)
2. Click "Add Subscription"
3. Subscription appears in the list with calculated monthly cost

### Remove a Subscription
1. Find the subscription in your list
2. Click "Remove" button
3. Subscription is deleted

### View Total Cost
- Total monthly cost is displayed at the bottom
- Updates automatically when subscriptions are added/removed

## Project Structure
```
subscription-dashboard/
├── src/
│   ├── config/
│   │   ├── express.js           # Express application setup
│   │   └── httpStatus.js        # HTTP status code constants
│   ├── controllers/
│   │   └── SubscriptionController.js
│   ├── middleware/
│   │   ├── ErrorHandler.js
│   │   ├── SecurityHandler.js
│   │   └── SubscriptionValidation.js
│   ├── models/
│   │   └── SubscriptionRepository.js
│   ├── public/
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── js/
│   │       ├── config.js        # Frontend constants
│   │       └── main.js
│   ├── routes/
│   │   └── SubscriptionRouter.js
│   ├── views/
│   │   └── index.html
│   └── server.js                # Application entry point
├── .env                         # Environment variables (not in git)
├── .env.example                 # Environment template
├── .gitignore
├── package.json
└── README.md
```

## Technologies

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **@hr222sy/subscription-tracker** - Subscription management module
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting

### Frontend
- **Vanilla JavaScript (ES6+)** - No frameworks
- **HTML5** - Semantic markup
- **CSS3** - Styling

## Security

The application implements multiple security layers:

- ✅ **Helmet** - Security headers (CSP, HSTS, etc.)
- ✅ **Rate Limiting** - 100 requests per minute per IP
- ✅ **Input Validation** - Server-side validation of all inputs
- ✅ **Error Handling** - Centralized error handling with proper responses

## Requirements

- **Language:** JavaScript (ES2020+)
- **Runtime:** Node.js >=20.6.0
- **Module system:** ES6 modules
- **Browser:** Modern browser with ES6 support

## License

MIT

## Author

Hanna Rubio Vretby <hr222sy@student.lnu.se>

---

## Development

### Available Scripts
```bash
npm start     # Start production server
npm run dev   # Start development server with auto-reload
```

### Environment Variables
```bash
PORT=3000              # Server port
NODE_ENV=development   # Environment (development/production)
```

## Academic Context

This project was created as part of the 1dv610 course at Linnaeus University, focusing on:
- Clean Code principles (Robert C. Martin)
- Object-oriented programming
- Software design patterns
- Code quality and maintainability
