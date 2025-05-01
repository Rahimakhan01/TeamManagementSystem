# Student Team Members Management Application

A comprehensive full-stack web application for managing student team members. This application allows you to add new team members, view all members, and see detailed information about each member.

## Features

- Add new team members with detailed information
- Upload profile photos for each member
- View all team members in a clean, card-based interface
- Search and filter team members
- View detailed profiles of individual team members
- Responsive design that works on all devices

## Technologies Used

### Frontend
- React.js
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose ORM
- Multer for file uploads

## Prerequisites

Before running this application, you need to have the following installed:
- Node.js (v16 or higher)
- MongoDB (local instance or MongoDB Atlas account)

## Installation & Setup

1. Clone this repository
 
2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/student-team-management
   PORT=5000
   NODE_ENV=development
   ```

4. Create uploads directory
   ```
   mkdir uploads
   ```

5. Start the development server
   # Run frontend and backend concurrently
   npm run dev:all

   # Or run them separately
   npm run dev        # Frontend only
   npm run server     # Backend only
   ```

## API Endpoints

### Members

- `GET /api/members` - Get all team members
- `GET /api/members/:id` - Get a specific team member by ID
- `POST /api/members` - Add a new team member (with image upload)

## Project Structure

```
student-team-management/
├── public/
├── server/
│   ├── models/
│   │   └── Member.js
│   ├── routes/
│   │   └── members.js
│   └── index.js
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AddMemberPage.tsx
│   │   ├── ViewMembersPage.tsx
│   │   ├── MemberDetailsPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── uploads/          # For storing uploaded images
├── .env
├── package.json
└── README.md
```
 https://github.com/user-attachments/assets/87104cb4-dd46-4eab-9e72-856d03c1fa73
