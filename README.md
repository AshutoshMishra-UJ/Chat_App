# 💬 Chat App

A modern, real-time chat application built with React Native (Expo) frontend and Node.js backend with Socket.io for real-time communication.

## 🚀 Features

### Frontend (React Native/Expo)
- **User Authentication**: Login and registration with form validation
- **Modern UI**: Clean, user-friendly interface with professional design
- **Real-time Messaging**: Instant message delivery with typing indicators
- **Message Status**: Delivery and read status indicators (✓ and ✓✓)
- **Online Status**: Real-time user online/offline status
- **Conversations**: Recent conversations list with unread message counts
- **Responsive Design**: Optimized for mobile devices

### Backend (Node.js)
- **RESTful API**: Authentication, users, and conversations endpoints
- **Real-time Communication**: Socket.io for instant messaging
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based user authentication
- **Middleware**: CORS, authentication, and error handling

## 📱 Screenshots

*Login Screen → Home Screen → Chat Interface*

## 🛠 Tech Stack

### Frontend
- **React Native** - Mobile app framework
- **Expo** - Development platform and build service
- **React Hooks** - State management (useState, useEffect)
- **StyleSheet** - Component styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AshutoshMishra-UJ/Chat_App.git
   cd Chat_App/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to ChatAppMobile**
   ```bash
   cd ../ChatAppMobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Expo development server**
   ```bash
   npx expo start
   ```

4. **Run on device**
   - Scan QR code with Expo Go app (Android/iOS)
   - Or press `w` to run in web browser

## 🔧 Usage

### Demo Credentials
- **Email**: `alice@example.com`
- **Password**: `password123`

### App Flow
1. **Login/Register**: Authenticate with email and password
2. **Home Screen**: View recent conversations and online users
3. **Chat Screen**: Send messages with real-time delivery status
4. **Features**: Typing indicators, message timestamps, online status

## 📁 Project Structure

```
Chat_App/
├── ChatAppMobile/          # React Native frontend
│   ├── App.js             # Main application component
│   ├── assets/            # Images and icons
│   ├── package.json       # Frontend dependencies
│   └── app.json          # Expo configuration
├── server/                # Node.js backend
│   ├── models/           # MongoDB models (User, Message, Conversation)
│   ├── routes/           # API routes (auth, users, conversations)
│   ├── middleware/       # Authentication middleware
│   ├── socket/           # Socket.io handlers
│   └── server.js         # Main server file
├── .gitignore            # Git ignore file
└── README.md             # Project documentation
```

## 🔒 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users
- `GET /api/users/profile` - Get user profile

### Conversations
- `GET /api/conversations` - Get user conversations
- `POST /api/conversations` - Create new conversation

### Socket Events
- `join_conversation` - Join a conversation room
- `send_message` - Send a new message
- `typing` - Typing indicator
- `user_online` / `user_offline` - User status

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
```bash
# Add environment variables in your deployment platform
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
```

### Frontend Deployment (Expo)
```bash
expo build:android  # For Android APK
expo build:ios      # For iOS (requires Apple Developer account)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ashutosh Mishra**
- GitHub: [@AshutoshMishra-UJ](https://github.com/AshutoshMishra-UJ)
- Repository: [Chat_App](https://github.com/AshutoshMishra-UJ/Chat_App)

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Expo team for the amazing development platform
- Socket.io for real-time communication capabilities
- MongoDB for flexible database solution

---

⭐ **Star this repository if you found it helpful!**
- **Conversation Management**: Create and manage 1:1 conversations
- **Message Status**: Sent, delivered, and read receipts
- **Typing Indicators**: See when the other user is typing
- **Online/Offline Status**: Real-time user presence
- **Message Persistence**: All messages stored in MongoDB
- **Responsive UI**: Clean and intuitive user interface

### 🏗️ Architecture
- **Frontend**: React Native with React Navigation
- **Backend**: Node.js + Express + Socket.IO
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO for bidirectional communication

## Project Structure

```
Chat_App/
├── server/                 # Backend (Node.js + Express + Socket.IO)
│   ├── models/            # Database models (User, Conversation, Message)
│   ├── routes/            # API routes (auth, users, conversations)
│   ├── middleware/        # Authentication middleware
│   ├── socket/            # Socket.IO event handlers
│   ├── .env              # Environment variables
│   ├── package.json      # Server dependencies
│   └── server.js         # Main server file
│
└── mobile/               # Frontend (React Native)
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── contexts/     # React contexts (Auth)
    │   ├── screens/      # App screens (Login, Register, Home, Chat)
    │   ├── services/     # API and Socket services
    │   └── utils/        # Utility functions
    ├── App.js           # Main app component
    ├── package.json     # Mobile app dependencies
    └── index.js         # Entry point
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- React Native development environment
- Android Studio (for Android) or Xcode (for iOS)

### Server Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the server directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Use your connection string

5. **Start the server:**
   ```bash
   npm run dev
   ```
   
   The server will start on `http://localhost:3000`

### Mobile App Setup

1. **Navigate to mobile directory:**
   ```bash
   cd mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update server URL:**
   - Edit `src/services/ApiService.js` and `src/services/SocketService.js`
   - Change `localhost` to your computer's IP address if testing on a physical device
   - Example: `http://192.168.1.100:3000`

4. **For Android:**
   ```bash
   npm run android
   ```

5. **For iOS:**
   ```bash
   npm run ios
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/conversation/:userId` - Create conversation with user

### Conversations
- `GET /api/conversations` - Get user's conversations
- `GET /api/conversations/:id/messages` - Get messages for conversation
- `PUT /api/conversations/:id/read` - Mark messages as read

### Health Check
- `GET /api/health` - Server health check

## Socket Events

### Client → Server
- `message:send` - Send new message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator
- `message:read` - Mark message as read

### Server → Client
- `message:new` - New message received
- `message:delivered` - Message delivered
- `message:read` - Message read confirmation
- `typing:start` - User started typing
- `typing:stop` - User stopped typing
- `user:online` - User came online
- `user:offline` - User went offline

## Sample Users

For testing, you can create these sample accounts:

| Username | Email | Password |
|----------|-------|----------|
| alice | alice@example.com | password123 |
| bob | bob@example.com | password123 |
| charlie | charlie@example.com | password123 |

## Development Notes

### Testing on Physical Device
1. Make sure your phone and computer are on the same network
2. Update the server URLs in the mobile app:
   - Find your computer's IP address (`ipconfig` on Windows, `ifconfig` on Mac/Linux)
   - Replace `localhost` with your IP address in `ApiService.js` and `SocketService.js`

### Database Schema

**User Model:**
```javascript
{
  username: String (unique, 3-30 chars)
  email: String (unique, valid email)
  password: String (hashed, min 6 chars)
  isOnline: Boolean
  lastSeen: Date
  avatar: String (optional)
}
```

**Conversation Model:**
```javascript
{
  participants: [ObjectId] (exactly 2 users)
  lastMessage: ObjectId (reference to Message)
  lastActivity: Date
}
```

**Message Model:**
```javascript
{
  conversation: ObjectId (reference to Conversation)
  sender: ObjectId (reference to User)
  receiver: ObjectId (reference to User)
  content: String (max 1000 chars)
  messageType: String (text/image/file)
  status: String (sent/delivered/read)
  readAt: Date
}
```

## Troubleshooting

### Common Issues

1. **Connection Refused Error:**
   - Make sure MongoDB is running
   - Check if server is running on correct port
   - Verify environment variables

2. **Socket Connection Issues:**
   - Check network connectivity
   - Verify server URL in mobile app
   - Ensure firewall allows connections

3. **Metro Bundler Issues:**
   - Clear React Native cache: `npx react-native start --reset-cache`
   - Clear npm cache: `npm cache clean --force`

4. **Authentication Issues:**
   - Check JWT secret configuration
   - Verify token storage in AsyncStorage
   - Check token expiration

### Performance Tips
- Implement message pagination for large conversations
- Add message caching for offline scenarios
- Optimize image/file message handling
- Implement connection retry logic

## Future Enhancements

- [ ] Group messaging
- [ ] Image and file sharing
- [ ] Push notifications
- [ ] Message encryption
- [ ] User profiles and avatars
- [ ] Message search functionality
- [ ] Message reactions
- [ ] Voice messages
- [ ] Video calling

## License

This project is for educational purposes. Feel free to use and modify as needed.

## Contact

For questions or issues, please refer to the assignment guidelines or contact your instructor.
