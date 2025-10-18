# Vision - Subscription Dashboard

**Student:** Hanna Rubio Vretby (hr222sy)  
**Course:** 1dv610  
**Project:** Subscription Dashboard  
**Technologies:** JavaScript, Node.js, Express, HTML/CSS, npm module

---

## Background and Problem Description

In today's subscription economy, the average person manages multiple recurring services across streaming, software, fitness, and other categories. This creates several challenges:

**The Problem:**
- **Subscription fatigue** - Too many services to track manually
- **Hidden costs** - Difficulty understanding total monthly/yearly spending
- **Forgotten subscriptions** - Paying for unused services that accumulate over time
- **Lack of overview** - No central place to view all subscriptions and costs

Many people attempt to manage subscriptions using:
- **Spreadsheets** (Excel, Google Sheets) - Manual and time-consuming
- **Bank statements** - Reactive, difficult to get overview
- **Mental notes** - Easy to forget and inaccurate
- **Multiple apps** for different services - Fragmented information

This leads to inefficient subscription management where valuable money is wasted on forgotten services and there's no clear picture of recurring expenses.

---

## Purpose

Subscription Dashboard aims to help users:

1. **Gain control over recurring costs**
   - Collect all subscriptions in one place
   - See total cost in different frequencies (weekly/monthly/yearly)

2. **Identify unused services**
   - Discover subscriptions that aren't being used
   - Make informed decisions about which services to keep

3. **Understand spending patterns**
   - Convert between different billing frequencies
   - Compare costs over time

4. **Demonstrate Clean Code principles** (Secondary purpose)
   - Show object-oriented design in practice
   - Apply Clean Code chapters 2-11
   - Integrate and use custom-developed npm module

---

## Target Audience

### Primary Users
**Individuals from the age of 18** with multiple digital subscriptions who want to:
- Take control of their monthly spending
- Identify and cancel unused subscriptions
- Get a clear overview of recurring costs
- Make informed decisions about which services to keep

**Typical characteristics:**
- Has several active subscriptions
- Uses streaming services, software tools, gym memberships, etc.
- Wants to budget and reduce unnecessary spending
- Comfortable using web applications
- Values simplicity over complex features

### Secondary Users
**Students and developers** who want to:
- Study Clean Code principles in practice
- See object-oriented design in a full-stack application
- Learn how to integrate and use npm modules
- Understand software architecture patterns

---

## Market and Competing Solutions

### Existing Solutions:

**1. Spreadsheets (Excel/Google Sheets)**
- **Strengths:** Flexible, customizable
- **Weaknesses:** Manual data entry, no automation, time-consuming
- **Target:** DIY users willing to maintain manually

**2. Banking Apps**
- **Strengths:** Automatic transaction tracking
- **Weaknesses:** Reactive, no categorization, no proactive management
- **Target:** General banking customers

**3. Notes/Todo Apps**
- **Strengths:** Simple, quick notes
- **Weaknesses:** No calculations, no structure, no analytics
- **Target:** General note-taking

### Current User Approach:
Most people combine multiple tools (or none at all) which creates:
- Fragmented information
- Risk of missing subscriptions
- No clear total cost overview

**Gap in Market:**  
Few solutions are specifically designed for Swedish users wanting a simple, focused tool for subscription management without complexity.

---

## Project Value and Functionality

Subscription Dashboard delivers:

### Centralized Subscription Overview
Collect all recurring costs in one place. No subscription forgotten, no cost hidden. Finally gain full control over your subscription spending with a simple, clear overview that's always up to date.

### Intelligent Cost Insights
View your total spending in the perspective that suits you best - per week, month, or year. Understand how small recurring costs accumulate over time and make informed decisions about which services are truly worth the money.

### Flexible Frequency Visualization
Compare apples to apples - whether a service bills weekly, monthly, or yearly, view all costs in the same timeframe. Switch between weekly, monthly, and yearly perspectives with one click to gain the insights you need right now.

### Simple and Fast Management
Minimalist interface without unnecessary complexity. Add or remove subscriptions in seconds, with no learning curve. Perfect for those who want control without spending time on administration.

### Mobile-Responsive Design
Manage your subscriptions wherever you are - at home on your computer or on the go with your mobile. Responsive design that works equally well on all devices.

### Secure and Reliable
Built with security in focus from the ground up. Protected against abuse and incorrect data, so you can trust that your information is handled correctly.

### Unique Advantages

**For Swedish Users:**
- Swedish currency (SEK) as default
- No need for bank account connection
- Privacy-first approach - your data stays with you

**For Learning:**
- Demonstrates Clean Code principles in practice
- Shows object-oriented design in full-stack context
- Example of npm module integration and usage
- MVC-inspired architecture

---

## Scope and Limitations

### MVP Scope (Current)
The project focuses on **fundamental subscription management**:
- Centralized overview of all subscriptions
- Automatic cost calculation and conversion
- Flexible frequency visualization (week/month/year)
- Secure input validation and protection

### Conscious Limitations (MVP)

**Technical Constraints (By Design):**

This is a **single-user application without authentication or data persistence**, designed specifically for demonstrating Clean Code principles and software design patterns in an academic context.

- **No user accounts** - Application assumes single user on local machine
- **No authentication system** - No login/logout functionality
- **In-memory storage only** - Data stored in server memory during runtime
- **No data persistence** - All subscriptions are lost on page reload or server restart
- **Single session design** - Each user session starts fresh

These constraints are **intentional for this assignment**, allowing focus on:
- Code quality and Clean Code principles (chapters 2-11)
- Object-oriented design and architectural patterns
- Module integration and proper separation of concerns
- Core subscription management functionality

**Functional Limitations:**
- **No edit functionality** - Users must delete and recreate to modify subscriptions
- **No usage analytics** - UsageAnalyzer from module not implemented in this version
- **No category grouping** - Subscriptions not grouped or filtered by category
- **No subscription reminders** - No notification system for upcoming renewals

### Future Development
Planned improvements for production version:
- **User authentication and accounts** - Secure login system with sessions
- **Database integration** - Persistent storage (MongoDB/PostgreSQL)
- **Multi-user support** - Each user maintains their own subscription list
- **Edit functionality** for subscriptions
- **LocalStorage fallback** - Client-side persistence for single-user scenarios
- **Usage analysis** - Cost per hour of use, identify unused services
- **Category breakdown** - Visual charts and spending by category
- **Export capabilities** - PDF reports and data export
- **Spending trends** - Track changes over time
- **Subscription reminders** - Notifications for upcoming renewals

---

## Technical Context

### Technology Stack

**Backend:**
- **Node.js (≥20.6.0)** - JavaScript runtime environment
- **Express 5** - Lightweight and flexible web framework
- **@hr222sy/subscription-tracker (v1.0.0)** - Custom npm module for subscription logic
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting protection

**Frontend:**
- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **HTML5** - Semantic markup
- **CSS3** - Responsive styling

**Architecture:**
- **MVC-inspired architecture** - Clear separation of Model, View, and Controller concerns
- **Repository Pattern** - Data access abstraction isolating the module
- **Object-Oriented Design** - Classes with single responsibilities
- **Clean Code Principles** - Readable, maintainable code following Martin's guidelines

### Why These Choices?

**Vanilla JavaScript** - Demonstrates core programming skills without framework magic, keeps the application lightweight and fast.

**Express** - Industry-standard web framework that's well-documented and flexible enough for educational purposes while being production-ready.

**Custom npm module** - Shows the complete development cycle from module creation to integration, demonstrating dependency management and API design.

**Object-Oriented Design** - Provides clear structure and demonstrates proper design patterns, making the code educational and maintainable.

**No database (MVP)** - Simplifies deployment and allows focus on code quality and architecture rather than infrastructure setup. Intentional constraint for this academic project.

---

## Academic Purpose

This project was created as part of the **1dv610 course** at Linnaeus University, focusing on:
- Clean Code principles (Robert C. Martin)
- Object-oriented programming
- Software design patterns
- Code quality and maintainability

**The module (@hr222sy/subscription-tracker)** was developed in Assignment 2 (L2) and is used here to demonstrate integration between module and application, showing proper separation of concerns and dependency management.

---

**Created by:** Hanna Rubio Vretby  
**Contact:** hr222sy@student.lnu.se  
**Institution:** Linnaeus University