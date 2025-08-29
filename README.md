# Cafe
This is a full-stack solution demonstrating a simple mobile application (React Native) and a backend server (NestJS + Mongoose).
The system allows to create, read, update and delete Beverages and Beverage Sizes as well as create order of beverages through the mobile app, while the backend manages beverage options and orders.

## Project Structure

cafe/

-- mobile/ # React-Native (Expo) mobile app

-- server/ # NestJS + Mongoose backend

-- README.md # Project documentation


---

## Features

### Mobile App (Mobile - React Native)
- Browse available Beverages
- Remove beverage item from the system
- View and update selected beverage item
- Browse available Beverage Sizes
- Remove beverage size item from the system
- View and update selected beverage size item
- Add beverages to the list and place orders

### Backend (Server - NestJS + Mongoose)
- Manage beverage types (CRUD)
- Manage beverage size types (CRUD)
- Manage customer orders
- REST API endpoints for client communication
- MongoDB persistence

---

## Tech Stack

**Frontend (Client):**
- React Native (Expo)
- React Query (for state management)
- Axios (for API calls)

**Backend (Server):**
- NestJS (modular backend framework)
- Mongoose (MongoDB ODM)
- RESTful API design

**Database:**
- MongoDB (Atlas)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone [https://github.com/ladi1cs/cafe](https://github.com/ladi1cs/cafe)
cd cafe
```

### 2. Backend Setup
```bash
cd server
npm install
npm start
```
Server should be running at: http://localhost:5000

### 3. Frontend Setup
```bash
cd mobile
npm install
npx expo start
 i - for iOS
 a - for Android 
```

---

## API Overview

### Beverages
 * ```GET /beverages``` - Get all beverages
 * ```POST /beverages``` - Create a new beverage
 * ```GET /beverages/:id``` - Get specific beverage
 * ```DELETE /beverages/:id``` - Delete specific beverage
 * ```PATCH /beverages/:id``` - Update specific beverage
   
### Beverage Sizes
 * ```GET /beveragesizes``` - Get all beverage sizes
 * ```POST /beveragesizes``` - Create a new beverage size
 * ```GET /beveragesizes/:id``` - Get specific beverage size
 * ```DELETE /beveragesizes/:id``` - Delete specific beverage size
 * ```PATCH /beveragesizes/:id``` - Update specific beverage size

### Orders
 * ```GET /ordes``` - Get all orders
 * ```POST /orders``` - Create a new order




