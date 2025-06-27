# User Management System

A modern, full-stack user management system built with React, Node.js, and MongoDB. it provides comprehensive user, role, privilege, and organization management capabilities with a beautiful, responsive UI.

## 🚀 Features

- **Multi-tenant Architecture**: Support for multiple organizations and tenants
- **Role-Based Access Control**: Granular permissions and privilege management
- **Modern UI/UX**: Beautiful, responsive design with glassmorphism effects
- **Real-time Updates**: Live data synchronization across components
- **Secure Authentication**: JWT-based authentication with refresh tokens
- **Comprehensive CRUD**: Full Create, Read, Update, Delete operations for all entities
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🏗️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Redux Toolkit** - State management with RTK Query
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **React Hook Form** - Form handling and validation
- **React Icons** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
MStack/
├── backend/                 # Node.js/Express API server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API route handlers
│   ├── index.js            # Server entry point
│   └── package.json        # Backend dependencies
├── frontend/               # React application
│   ├── src/
│   │   ├── api/           # API integration layer
│   │   ├── app/           # App-level components
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Feature-based pages
│   │   ├── store/         # Redux store and slices
│   │   └── main.jsx       # React entry point
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mstack
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 🚀 Quick Start

1. **Start MongoDB** (if using local installation):
   ```bash
   mongod
   ```

2. **Start the backend server:**
   ```bash
   cd backend && npm run dev
   ```

3. **Start the frontend application:**
   ```bash
   cd frontend && npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

5. **Login with default credentials:**
   - Email: `admin@example.com`
   - Password: `admin123`

## 📚 Available Scripts

### Backend Scripts
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests (not implemented yet)
```

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000                                    # Server port
MONGO_URI=mongodb://localhost:27017/mstack   # MongoDB connection string
JWT_SECRET=your-jwt-secret                   # JWT signing secret
JWT_REFRESH_SECRET=your-refresh-secret       # JWT refresh secret
NODE_ENV=development                         # Environment mode
```

#### Frontend (vite.config.js)
The frontend is configured to proxy API requests to the backend during development.

## 🗄️ Database Schema

The application uses MongoDB with the following main collections:

- **Users**: User accounts and authentication
- **Tenants**: Multi-tenant organizations
- **Organizations**: Sub-organizations within tenants
- **Roles**: User roles and permissions
- **Privileges**: Granular permissions
- **Legal Entities**: Legal business entities

## 🔐 Authentication

The system uses JWT-based authentication:

1. **Login**: POST `/api/v1/auth/login`
2. **Token Refresh**: POST `/api/v1/auth/refresh`
3. **Logout**: POST `/api/v1/auth/logout`

Tokens are automatically managed by the frontend Redux store.

## 🎨 UI Components

The application features a modern, responsive design with:

- **Glassmorphism Effects**: Translucent cards and overlays
- **Gradient Backgrounds**: Beautiful blue-purple gradients
- **Smooth Animations**: CSS transitions and micro-interactions
- **Responsive Layout**: Mobile-first design approach
- **Modern Forms**: Clean, accessible form components

## 🧪 Testing

Currently, the project doesn't include automated tests. To add testing:

1. **Backend Testing**: Add Jest and Supertest
2. **Frontend Testing**: Add React Testing Library and Jest
3. **E2E Testing**: Add Playwright or Cypress

## 📦 Deployment

### Backend Deployment
1. Set production environment variables
2. Build and deploy to your preferred platform (Heroku, AWS, etc.)
3. Configure MongoDB connection string

### Frontend Deployment
1. Run `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure API endpoint for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the component documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core functionality
- Modern UI redesign with glassmorphism effects
- Multi-tenant architecture implementation
- Role-based access control system 