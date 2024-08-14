# Inventory Management System

## Overview

This is a simple Inventory Management System that allows users to manage and track their inventory items. The project consists of a frontend built with Vite and a backend built with Node.js and Express. MongoDB Atlas is used for the database.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account

### Frontend Setup

1. **make sure your are the main directory**

2. **Install the necessary dependencies:**
     ```bash
   npm install
    ```
3. **Run the development server:**
   ```bash
   npm run dev
    ```

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd Backend
    ```
2. **Install the necessary dependencies:**
     ```bash
   npm install
    ```
3. **Setup MongoDB Atlas:**
   - Create a new cluster on <a href="https://www.mongodb.com/">MongoDB Atlas</a>.
   - Create a database and obtain the connection URI.
     
4. **Configure environment variables:**
   - In the Backend directory, create a .env file with the following content:
     ```plaintext
     MONGODB_URI=your_mongodb_atlas_uri
     PORT=5000
     ```
5. **Start the backend server:**
   ```bash
    node server.js
    ```
The backend should now be running on http://localhost:5000.


