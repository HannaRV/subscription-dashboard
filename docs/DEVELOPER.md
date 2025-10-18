# Developer Guide

**For developers who want to understand the codebase and architecture.**

---

## Architecture Overview

### Three-Tier Architecture with MVC Principles
```
┌─────────────────────────────────────────────┐
│         Presentation Layer                  │
│  SubscriptionController (Backend)           │
│  SubscriptionApp (Frontend)                 │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│         Business Logic Layer                │
│  @hr222sy/subscription-tracker (npm module) │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│         Data Access Layer                   │
│  SubscriptionRepository (Boundary)          │
└─────────────────────────────────────────────┘
```

**MVC-Inspired Implementation:**

This is not classical MVC with Observer pattern, but follows MVC principles adapted for web applications.

**Backend (Request-Response MVC):**
- Request → Controller → Repository → Module
- Controller returns HTML response (View)

**Frontend (MVP - Model-View-Presenter):**
- User input → SubscriptionApp (Presenter)
- Presenter coordinates SubscriptionAPI (Model) ↔ SubscriptionView (View)
- View is passive, Presenter tells it what to render

---

## Project Structure
```
src/
├── server.js                    # Entry point
├── config/
│   ├── express.js               # App configuration
│   └── httpStatus.js            # Constants
├── controllers/
│   └── SubscriptionController.js # HTTP handling (MVC Controller)
├── models/
│   └── SubscriptionRepository.js # Data access (Boundary to module)
├── routes/
│   └── SubscriptionRouter.js     # Route definitions
├── middleware/
│   ├── ErrorHandler.js           # Error handling
│   ├── SecurityHandler.js        # Security (helmet, rate limiting)
│   └── SubscriptionValidation.js # Input validation
└── views/
    └── index.html                # HTML template

public/js/
├── main.js                       # Frontend entry
├── constants.js                  # Frontend config
├── app/
│   └── SubscriptionApp.js        # Main controller (MVP Presenter)
├── api/
│   └── SubscriptionAPI.js        # Fetch wrapper (Boundary)
├── views/
│   └── SubscriptionView.js       # DOM manipulation
└── factories/
    └── SubscriptionElementFactory.js # HTML creation
```

---

## Design Patterns

### Repository Pattern
**SubscriptionRepository** isolates the npm module from application code.

- Wraps SubscriptionCollection from module
- Transforms domain objects to plain objects for JSON
- Module can be swapped without changing app code

### Factory Pattern
**SubscriptionElementFactory** centralizes HTML element creation.

- Consistent HTML structure
- Separation of concerns (View delegates to Factory)

### Dependency Injection
**Three strategies based on context:**

**Backend:** Constructor with default parameter
```javascript
constructor(repository = new SubscriptionRepository()) { }
```
- Testable (can inject mock) + Simple for production

**Frontend:** Direct construction
```javascript
constructor() {
  this.#api = new SubscriptionAPI()
  this.#view = new SubscriptionView()
}
```
- Simple for stable dependencies

**Module:** Parameter passing (only where needed)

### Strategy Pattern (Dictionary)
**Frequency calculations** use dictionary instead of switch statements.
```javascript
this.#frequencyCalculators = {
  weekly: { single: (sub) => calculateWeekly(sub), ... },
  monthly: { ... },
  yearly: { ... }
}
```
- Open/Closed Principle (add frequency without modifying code)

---

## Key Classes

### Backend

**SubscriptionController** - HTTP request handling
- `renderHomePage()` - Display all subscriptions
- `addSubscription()` - Create subscription
- `removeSubscription()` - Delete subscription

**SubscriptionRepository** - Data access layer (Boundary)
- `createSubscription()` - Create and add
- `removeSubscription()` - Remove (returns boolean)
- `getAllSubscriptionsAsPlainObjects()` - Get as JSON-ready objects
- `calculateTotalCost(frequency)` - Calculate total

**SubscriptionValidation** - Input validation (Middleware)
- Validates name, price, frequency, category
- Throws Error with descriptive message

**ErrorHandler** - Centralized error handling
- Delegates to Logger, Classifier, Responder
- Each helper has single responsibility

### Frontend

**SubscriptionApp** - Main controller (MVP Presenter)
- Coordinates API (Model) and View
- Handles user interactions
- Maintains application state

**SubscriptionAPI** - Fetch wrapper (Boundary)
- `fetchSubscriptions()`, `addSubscription()`, `removeSubscription()`
- Isolates network layer

**SubscriptionView** - DOM manipulation (Passive View)
- `renderSubscriptions()`, `renderEmptyState()`, `updateTotalCost()`
- No business logic, only rendering

**SubscriptionElementFactory** - HTML element creation
- `createSubscriptionCard()` - Returns DocumentFragment

---

## Code Standards

### Naming Conventions
- Classes: `PascalCase`
- Methods: `camelCase`
- Private fields: `#camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Key Principles
- **Single Responsibility** - Each class has one reason to change
- **DRY** - Constants for magic strings, shared methods
- **Information Hiding** - Private fields, minimal public API
- **Small Functions** - 3-20 lines, do ONE thing

---

## Design Trade-offs

**removeSubscription() returns boolean:**
- "Not found" is expected business logic, not exceptional
- More user-friendly than try-catch
- Trade-off: Breaks CQS, but improves usability

**ErrorClassifier uses keyword matching:**
- Module throws standard Errors
- Custom errors would break boundary or require re-wrapping
- Trade-off: Brittle if messages change, pragmatic for MVP

**Repository creates plain objects:**
- Domain objects shouldn't leak to presentation
- JSON serialization requires plain objects
- Trade-off: Extra transformation, cleaner architecture

---

## Resources

- Clean Code by Robert C. Martin
- npm module: [@hr222sy/subscription-tracker](https://www.npmjs.com/package/@hr222sy/subscription-tracker)
- Usage guide: [README.md](../README.md)