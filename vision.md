# Vision - Subscription Dashboard

**Name:** Hanna Rubio Vretby  
**Username:** hr222sy  
**Course:** 1dv610  
**Project:** Subscription Dashboard  
**Technologies:** JavaScript, Node.js, Express, HTML/CSS, npm module
---

## Background and Problem Description

In today's subscription economy, the average person manages 10+ recurring services across streaming, software, fitness, and other categories. This creates several challenges:

**The Problem:**
- **Subscription fatigue** - Too many services to track manually
- **Hidden costs** - Difficulty understanding total monthly/yearly spending
- **Forgotten subscriptions** - Paying for unused services that add up over time
- **Lack of overview** - No central place to see all subscriptions and costs

Many people attempt to manage subscriptions using:
- Spreadsheets (Excel, Google Sheets) - Manual and time-consuming
- Bank statements - Reactive, hard to get overview
- Mental notes - Easy to forget and inaccurate
- Multiple apps for different services - Fragmented information

This leads to inefficient subscription management where valuable money is wasted on forgotten services and there's no clear picture of recurring expenses.

---

## Target Audience

### Primary Users
**Individuals aged 18-45** with multiple digital subscriptions who want to:
- Take control of their monthly spending
- Identify and cancel unused subscriptions
- Get a clear overview of recurring costs
- Make informed decisions about which services to keep

**Typical characteristics:**
- Has 5-15 active subscriptions
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

**3. Banking Apps**
- **Strengths:** Automatic transaction tracking
- **Weaknesses:** Reactive, no categorization, no proactive management
- **Target:** General banking customers

**4. Notes/Todo Apps**
- **Strengths:** Simple, quick notes
- **Weaknesses:** No calculations, no structure, no analytics
- **Target:** General note-taking

### Current User Approach:
Most people combine multiple tools (or no at all) which creates:
- Fragmented information
- Risk of missing subscriptions
- No clear total cost overview

**Gap in Market:**  
Few solutions are specifically designed for Swedish users wanting a simple, focused tool for subscription management without complexity.

---

## Core Requirements / Features / Unique Selling Points

Subscription Dashboard aims to deliver:

### MVP Features (Current)
1. **Simple Subscription Management**
   - Add subscriptions with name, price, frequency, category
   - Remove subscriptions easily
   - View all subscriptions in one place

2. **Automatic Cost Calculation**
   - Total cost calculation in multiple frequencies
   - Converts between weekly/monthly/yearly frequencies
   - Real-time updates

3. **Frequency Toggle**
   - View all subscriptions in weekly, monthly, or yearly cost
   - See both display cost and original billing frequency
   - Dynamic total cost updates based on selected view
   - Helps users understand subscription value across different timeframes

4. **Clean Interface**
   - Minimal learning curve
   - Mobile-responsive design
   - Quick overview of spending

5. **Security**
   - Input validation and sanitization
   - Rate limiting
   - Security headers (helmet)

### Future Enhancements (Post-MVP)
1. **Edit Subscription**
   - Modify existing subscription details
   - Update price, frequency, or category
   - Currently requires delete + re-add

2. **Usage Analytics**
   - Identify unused subscriptions (0 usage hours)
   - Calculate cost per hour of use
   - Find underutilized services

3. **Category Breakdown**
   - See spending by category (streaming, software, fitness)
   - Visual breakdown with charts
   - Compare categories

4. **Data Persistence**
   - User accounts
   - Save subscriptions between sessions
   - Cloud backup

5. **Advanced Features**
   - Search and filter subscriptions
   - Sort by price, name, or category
   - Subscription reminders
   - Spending trends over time
   - Export to PDF
   
### Unique Selling Points
- **Swedish-focused** - Built for Swedish market with SEK currency
- **Privacy-first** - No bank account connection required
- **Lightweight** - Fast, simple, focused on one task
- **Module-powered** - Uses published npm module (@hr222sy/subscription-tracker)

---

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework for routing and middleware
- **@hr222sy/subscription-tracker** - Custom npm module for subscription logic
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting protection

### Frontend
- **Vanilla JavaScript (ES6+)** - No framework overhead
- **HTML5** - Semantic markup
- **CSS3** - Responsive styling

### Architecture
- **MVC Pattern** - Clear separation of concerns
- **Repository Pattern** - Data access abstraction
- **Object-Oriented Design** - Classes with single responsibilities
- **Clean Code Principles** - Readable, maintainable code

### Why These Choices?
- **Vanilla JS** - No framework complexity
- **Express** - Lightweight, flexible and well-documented
- **Custom module** - Demonstrates module creation and npm publishing
- **OOP** - Shows proper object-oriented design patterns
- **No database (MVP)** - Simplifies deployment and focus on code quality

This project is created as part of the **1dv610 course** at Linnaeus University, demonstrating the practical application of Clean Code principles and object-oriented design patterns.