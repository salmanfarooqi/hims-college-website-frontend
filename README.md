# HIMS College Application System

A modern, full-stack college application system built with Next.js frontend and Express.js backend with PostgreSQL database.

## Features

### Frontend (Next.js)
- 🎨 Modern, responsive landing page with beautiful UI
- 📝 Comprehensive online application form
- 📱 Mobile-friendly design
- ⚡ Fast loading with Next.js 14
- 🎭 Smooth animations with Framer Motion

### Backend (Express.js + PostgreSQL)
- 🔐 Secure admin authentication with JWT
- 📊 Complete application management system
- 📁 File upload support for documents
- 📈 Real-time statistics and analytics
- 🛡️ Protected admin routes

### Admin Dashboard
- 👥 View all student applications
- 🔍 Search and filter applications
- ✅ Approve/reject applications with notes
- 📊 View application statistics
- 📱 Responsive admin interface

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Express.js** - Node.js framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd hims
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Database Setup

#### Create PostgreSQL Database
```sql
CREATE DATABASE hims_college;
```

#### Update Database Configuration
Edit `backend/config.env` with your PostgreSQL credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hims_college
DB_USER=your_username
DB_PASSWORD=your_password
```

### 5. Start the Backend Server
```bash
cd backend
npm run dev
```

The backend will start on `https://hims-college-backend.vercel.app`

### 6. Start the Frontend Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## Usage

### For Students
1. Visit `http://localhost:3000`
2. Navigate to the "Apply" page
3. Fill out the comprehensive application form
4. Upload required documents
5. Submit the application

### For College Administrators
1. Visit `http://localhost:3000/admin`
2. Login with admin credentials:
   - Email: `admin@hims.edu`
   - Password: `admin123`
3. View and manage all applications
4. Update application status and add notes

## API Endpoints

### Public Endpoints
- `POST /api/applications` - Submit new application
- `GET /api/applications/status/:email` - Check application status

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/applications` - Get all applications
- `GET /api/admin/applications/:id` - Get specific application
- `PATCH /api/admin/applications/:id` - Update application status
- `GET /api/admin/statistics` - Get application statistics

## Database Schema

### Applications Table
- `id` - Primary key
- `firstName` - Student's first name
- `lastName` - Student's last name
- `email` - Student's email
- `phone` - Student's phone number
- `dateOfBirth` - Date of birth
- `gender` - Gender (male/female/other)
- `address` - Full address
- `city` - City
- `state` - State
- `zipCode` - ZIP code
- `program` - Selected program
- `previousSchool` - Previous school name
- `previousGrade` - Previous grade/result
- `documents` - Uploaded documents (JSON)
- `status` - Application status (pending/reviewed/approved/rejected)
- `notes` - Admin notes
- `applicationDate` - Application submission date

### Admins Table
- `id` - Primary key
- `email` - Admin email
- `password` - Hashed password
- `name` - Admin name
- `role` - Admin role

## File Structure

```
hims/
├── app/                    # Next.js frontend
│   ├── components/        # React components
│   ├── admin/            # Admin dashboard
│   ├── apply/            # Application page
│   └── ...
├── backend/               # Express.js backend
│   ├── config/           # Database configuration
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── uploads/          # File uploads
└── README.md
```

## Security Features

- JWT-based authentication for admin routes
- Password hashing with bcryptjs
- CORS protection
- Input validation and sanitization
- File upload restrictions

## Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically

### Backend (Railway/Heroku)
1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy Express.js application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@hims.edu or create an issue in the repository. 