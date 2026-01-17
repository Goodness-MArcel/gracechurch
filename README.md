# Grace Church Website

A Next.js application for Grace of God Church with admin panel and authentication.

## Features

- Church website with events, sermons, and content management
- **Admin-only authentication system** (no regular users)
- JWT-based authentication system
- Sequelize ORM with PostgreSQL database (Aiven)
- Responsive Bootstrap UI

## Setup

### 1. Environment Variables

Create a `.env.local` file in the root directory with your **actual Aiven PostgreSQL connection string**:

```env
# Database Configuration (Aiven PostgreSQL)
DATABASE_URL=postgresql://your-actual-username:your-actual-password@your-actual-host:5432/your-actual-database

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
```

**Note:** The application is configured to handle SSL connections with Aiven's certificates using `rejectUnauthorized: false` to bypass self-signed certificate validation.

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

**Important:** Make sure your Aiven PostgreSQL database is running and accessible.

Run the database setup script to create tables and seed the admin user:

```bash
npm run setup-db
```

This will create the database tables and an admin user with:
- **Email:** `admin@gracechurch.com`
- **Password:** `admin123`

**✅ Setup Complete:** The database has been successfully configured with SSL certificate handling for Aiven.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Admin Access

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

Use the admin credentials created during setup to log in.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login with JWT token generation
- `GET /api/auth/verify` - Token verification
- `POST /api/auth/register` - Register additional admin users (optional)

## Database Schema

### Users Table (Admin Users Only)
- `id` - Primary key
- `email` - Unique email address
- `password` - Hashed password
- `firstName` - Admin's first name
- `lastName` - Admin's last name
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

## Technologies Used

- **Frontend**: Next.js 16, React 19, Bootstrap 5
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Aiven)
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
