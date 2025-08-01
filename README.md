# Notes Application - Assignment 3

A full-stack notes application built with Node.js, Express, MongoDB, and vanilla JavaScript. This application allows users to create, read, update, and delete notes with user authentication.

## 🚀 Features

- **User Authentication**: Register and login with secure password hashing
- **CRUD Operations**: Create, read, update, and delete notes
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Minimal, distraction-free interface
- **Real-time Updates**: Dynamic note rendering without page refresh
- **Data Persistence**: MongoDB database storage
- **Comprehensive Testing**: Unit, integration, and API tests

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** with **Mongoose** - Database and ODM
- **Passport.js** - Authentication middleware
- **bcrypt** - Password hashing
- **express-session** - Session management

### Frontend
- **Vanilla JavaScript** - Client-side logic
- **EJS** - Template engine
- **CSS3** - Styling with custom properties

### Testing
- **Mocha** - Testing framework
- **Chai** - Assertion library
- **Supertest** - HTTP assertion library
- **MongoDB Memory Server** - In-memory database for testing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher)
- **MongoDB** (version 4.0 or higher) OR **MongoDB Atlas** account

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ramblerrichie/assignment3-notes-taking-app.git
cd assignment3-notes-taking-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/notes-app
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-here

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

#### Option B: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file

### 5. Run the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Test Types
- **Unit Tests**: Test individual controller functions
- **API Tests**: Test HTTP endpoints and responses
- **Integration Tests**: Test complete user workflows

### Test Coverage
- ✅ Authentication controllers
- ✅ Notes CRUD operations
- ✅ API route validation
- ✅ Error handling
- ✅ Database operations

## 📁 Project Structure

```
assignment_3/
├── controllers/           # Request handlers
│   ├── authController.js  # Authentication logic
│   └── notesController.js # Notes CRUD operations
├── models/               # Database schemas
│   └── schema.js         # User and Note models
├── routes/               # API routes
│   ├── authRouter.js     # Authentication routes
│   └── notesRouter.js    # Notes API routes
├── views/                # EJS templates
│   ├── index.ejs         # Main notes page
│   ├── login.ejs         # Login page
│   └── register.ejs      # Registration page
├── public/               # Static assets
│   ├── app.js           # Frontend JavaScript
│   └── styles.css       # Application styles
├── test/                 # Test files
│   ├── setup.js         # Test database setup
│   ├── controllers/     # Controller unit tests
│   ├── routes/          # API route tests
│   └── integration.test.js # End-to-end tests
├── server.js            # Application entry point
├── passport-config.js   # Passport.js configuration
└── package.json         # Dependencies and scripts
```

## 🔐 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `DELETE /logout` - User logout

### Notes
- `GET /api` - Get all notes
- `POST /api` - Create new note
- `PUT /api/:id` - Update note
- `DELETE /api/:id` - Delete note

## 🎯 Usage

### 1. User Registration
1. Navigate to `/register`
2. Fill in name, email, and password
3. Click "Register"

### 2. User Login
1. Navigate to `/login`
2. Enter email and password
3. Click "Login"

### 3. Managing Notes
1. **Create**: Click "Add Note" button
2. **Edit**: Click "Edit" on any note
3. **Delete**: Click "Delete" and confirm
4. **View**: All notes display on the main page

## 🚀 Deployment

### Heroku Deployment
1. Install Heroku CLI
2. Login to Heroku: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set SESSION_SECRET=your-session-secret
   ```
5. Deploy: `git push heroku main`

### Railway Deployment
1. Connect GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

## 🔍 Development Process & Learning

### Challenges Encountered

1. **Authentication Implementation**
   - **Challenge**: Integrating Passport.js with Express sessions
   - **Solution**: Proper session configuration and passport initialization
   - **Learning**: Understanding middleware order and session management

2. **Database Design**
   - **Challenge**: Designing efficient schemas for users and notes
   - **Solution**: Using Mongoose for schema validation and relationships
   - **Learning**: MongoDB document design patterns

3. **Frontend State Management**
   - **Challenge**: Managing note updates without page refresh
   - **Solution**: Implementing AJAX calls with proper error handling
   - **Learning**: Asynchronous JavaScript and DOM manipulation

4. **Testing Setup**
   - **Challenge**: Setting up isolated test environment
   - **Solution**: Using MongoDB Memory Server for test isolation
   - **Learning**: Test-driven development and proper test structure

5. **Security Considerations**
   - **Challenge**: Preventing XSS and implementing secure authentication
   - **Solution**: Input validation, password hashing, and session security
   - **Learning**: Web security best practices

### Key Learnings

1. **Full-Stack Development**: Understanding how frontend and backend communicate
2. **RESTful API Design**: Creating consistent and intuitive API endpoints
3. **Database Operations**: CRUD operations with MongoDB and Mongoose
4. **Authentication Flow**: Implementing secure user registration and login
5. **Testing Strategy**: Writing comprehensive tests for reliability
6. **Error Handling**: Proper error handling and user feedback
7. **Code Organization**: Structuring code for maintainability

### Technical Decisions

1. **Vanilla JavaScript**: Chose vanilla JS over frameworks for learning fundamentals
2. **EJS Templates**: Used for server-side rendering with familiar HTML syntax
3. **Mocha Testing**: Selected for comprehensive testing capabilities
4. **Session-based Auth**: Implemented instead of JWT for simplicity
5. **Minimal UI**: Focused on functionality over complex styling

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Richie MS**
- GitHub: [@ramblerrichie](https://github.com/ramblerrichie)
- Repository: [assignment3-notes-taking-app](https://github.com/ramblerrichie/assignment3-notes-taking-app)

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- MongoDB team for the flexible database solution
- Passport.js for authentication middleware
- Mocha and Chai for testing frameworks
