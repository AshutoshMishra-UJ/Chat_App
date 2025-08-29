import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  Switch,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// Mock data for demo (in real app, this would come from your backend)
const mockUsers = [
  { id: '1', username: 'Alice Johnson', email: 'alice@example.com', isOnline: true, lastSeen: new Date(), avatar: require('./assets/icon.png') },
  { id: '2', username: 'Bob Smith', email: 'bob@example.com', isOnline: false, lastSeen: new Date(Date.now() - 300000), avatar: require('./assets/icon.png') },
  { id: '3', username: 'Charlie Brown', email: 'charlie@example.com', isOnline: true, lastSeen: new Date(), avatar: require('./assets/icon.png') },
  { id: '4', username: 'Diana Prince', email: 'diana@example.com', isOnline: false, lastSeen: new Date(Date.now() - 600000), avatar: require('./assets/icon.png') },
];

const mockConversations = [
  {
    id: '1',
    user: mockUsers[0],
    lastMessage: { text: 'Hey! How are you?', time: new Date(Date.now() - 120000), sender: 'Alice Johnson' },
    unreadCount: 2
  },
  {
    id: '2',
    user: mockUsers[1],
    lastMessage: { text: 'See you tomorrow!', time: new Date(Date.now() - 1800000), sender: 'You' },
    unreadCount: 0
  },
  {
    id: '3',
    user: mockUsers[2],
    lastMessage: { text: 'Thanks for the help', time: new Date(Date.now() - 3600000), sender: 'Charlie Brown' },
    unreadCount: 1
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  // AUTH STYLES
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  authForm: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  authButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  authToggle: {
    marginTop: 20,
    alignItems: 'center',
  },
  authToggleText: {
    fontSize: 14,
    color: '#666',
  },
  authToggleLink: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  demoCredentials: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  demoText: {
    fontSize: 12,
    color: '#1976d2',
    marginBottom: 2,
  },

  // HOME STYLES
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ff4444',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  homeContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  conversationsHeader: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  conversationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  conversationsSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  conversationsList: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  conversationAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  conversationMeta: {
    alignItems: 'flex-end',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  allUsersSection: {
    backgroundColor: '#fff',
    padding: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  userStatus: {
    fontSize: 12,
    color: '#666',
  },

  // CHAT STYLES
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#2196F3',
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatUserInfo: {
    flex: 1,
  },
  chatUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chatUserStatus: {
    fontSize: 12,
    color: '#666',
  },
  typingIndicator: {
    fontSize: 12,
    color: '#2196F3',
    fontStyle: 'italic',
  },
  chatMenuButton: {
    padding: 8,
  },
  chatMenuText: {
    fontSize: 20,
    color: '#666',
  },
  messagesList: {
    flex: 1,
    paddingVertical: 10,
  },
  messageContainer: {
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  myMessageBubble: {
    backgroundColor: '#2196F3',
    borderBottomRightRadius: 6,
  },
  otherMessageBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#333',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  myMessageTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  otherMessageTime: {
    color: '#999',
  },
  messageStatus: {
    fontSize: 11,
  },
  readStatus: {
    color: 'rgba(255,255,255,0.9)',
  },
  deliveredStatus: {
    color: 'rgba(255,255,255,0.7)',
  },
  bubbleAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  typingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  typingText: {
    fontSize: 12,
    color: '#2196F3',
    fontStyle: 'italic',
  },
  messageInputContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  messageInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // LOADING
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  // Auth forms
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  // Chat data
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const flatListRef = React.useRef();

  // Helper functions
  const formatTime = (time) => {
    if (!time) return '';
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastSeen = (time) => {
    if (!time) return '';
    const now = new Date();
    const lastSeen = new Date(time);
    const diffMs = now - lastSeen;
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.round(diffMins / 60)}h ago`;
    return `${Math.round(diffMins / 1440)}d ago`;
  };

  const getMessageStatusIcon = (status) => {
    return status === 'read' ? '✓✓' : '✓';
  };

  // Initialize mock messages for selected user
  useEffect(() => {
    if (selectedUser) {
      const mockMessages = [
        {
          id: '1',
          text: 'Hello! How are you doing today?',
          sender: selectedUser.username,
          time: new Date(Date.now() - 3600000),
          status: 'read',
          avatar: selectedUser.avatar
        },
        {
          id: '2',
          text: 'I\'m doing great, thanks for asking! How about you?',
          sender: 'You',
          time: new Date(Date.now() - 3000000),
          status: 'read',
          avatar: currentUser?.avatar || require('./assets/icon.png')
        },
        {
          id: '3',
          text: 'That\'s wonderful to hear! I\'m doing well too.',
          sender: selectedUser.username,
          time: new Date(Date.now() - 1800000),
          status: 'read',
          avatar: selectedUser.avatar
        },
        {
          id: '4',
          text: 'Great! Are we still on for the meeting tomorrow?',
          sender: 'You',
          time: new Date(Date.now() - 600000),
          status: 'delivered',
          avatar: currentUser?.avatar || require('./assets/icon.png')
        },
      ];
      setMessages(mockMessages);
    }
  }, [selectedUser, currentUser]);

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === loginForm.email);
      if (user && loginForm.password === 'password123') {
        setCurrentUser(user);
        setCurrentScreen('home');
        Alert.alert('Success', 'Login successful!');
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = async () => {
    if (!registerForm.username || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (registerForm.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        username: registerForm.username,
        email: registerForm.email,
        isOnline: true,
        lastSeen: new Date()
      };
      setCurrentUser(newUser);
      setCurrentScreen('home');
      Alert.alert('Success', 'Registration successful!');
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            setCurrentUser(null);
            setCurrentScreen('login');
            setLoginForm({ email: '', password: '' });
            setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
          }
        }
      ]
    );
  };

  const startChat = (user) => {
    setSelectedUser(user);
    setCurrentScreen('chat');
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'You',
      time: new Date(),
      status: 'delivered',
      avatar: currentUser?.avatar || require('./assets/icon.png')
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(false);

    // Simulate message status update
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'read' } : msg
      ));
    }, 1000);
  };

  // LOGIN SCREEN
  if (currentScreen === 'login') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.authContainer}>
          <View style={styles.authHeader}>
            <Text style={styles.appTitle}>ChatApp</Text>
            <Text style={styles.authSubtitle}>Welcome back! Please sign in to your account</Text>
          </View>

          <View style={styles.authForm}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#666"
                value={loginForm.email}
                onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                value={loginForm.password}
                onChangeText={(text) => setLoginForm({ ...loginForm, password: text })}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.authButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.authButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.authToggle}>
              <Text style={styles.authToggleText}>
                Don't have an account?{' '}
                <Text
                  style={styles.authToggleLink}
                  onPress={() => setCurrentScreen('register')}
                >
                  Sign Up
                </Text>
              </Text>
            </View>

            <View style={styles.demoCredentials}>
              <Text style={styles.demoText}>Demo Credentials:</Text>
              <Text style={styles.demoText}>Email: alice@example.com</Text>
              <Text style={styles.demoText}>Password: password123</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // REGISTER SCREEN
  if (currentScreen === 'register') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.authContainer}>
          <View style={styles.authHeader}>
            <Text style={styles.appTitle}>ChatApp</Text>
            <Text style={styles.authSubtitle}>Create your account to get started</Text>
          </View>

          <View style={styles.authForm}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#666"
                value={registerForm.username}
                onChangeText={(text) => setRegisterForm({ ...registerForm, username: text })}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#666"
                value={registerForm.email}
                onChangeText={(text) => setRegisterForm({ ...registerForm, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                value={registerForm.password}
                onChangeText={(text) => setRegisterForm({ ...registerForm, password: text })}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor="#666"
                value={registerForm.confirmPassword}
                onChangeText={(text) => setRegisterForm({ ...registerForm, confirmPassword: text })}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.authButton}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.authButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.authToggle}>
              <Text style={styles.authToggleText}>
                Already have an account?{' '}
                <Text
                  style={styles.authToggleLink}
                  onPress={() => setCurrentScreen('login')}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // HOME SCREEN
  if (currentScreen === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.homeHeader}>
          <Text style={styles.homeTitle}>Chats</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.homeContent}>
          <View style={styles.conversationsHeader}>
            <Text style={styles.conversationsTitle}>Recent Conversations</Text>
            <Text style={styles.conversationsSubtitle}>Start a conversation with your contacts</Text>
          </View>

          <View style={styles.conversationsList}>
            {mockConversations.map(conversation => (
              <TouchableOpacity
                key={conversation.id}
                style={styles.conversationItem}
                onPress={() => startChat(conversation.user)}
              >
                <View style={styles.conversationAvatar}>
                  <Text style={styles.avatarText}>
                    {conversation.user.username[0].toUpperCase()}
                  </Text>
                </View>
                <View style={styles.conversationInfo}>
                  <Text style={styles.conversationName}>{conversation.user.username}</Text>
                  <Text style={styles.lastMessage}>{conversation.lastMessage.text}</Text>
                </View>
                <View style={styles.conversationMeta}>
                  <Text style={styles.messageTime}>
                    {formatTime(conversation.lastMessage.time)}
                  </Text>
                  {conversation.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{conversation.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.allUsersSection}>
            <Text style={styles.conversationsTitle}>All Users</Text>
            {mockUsers.filter(user => user.id !== currentUser?.id).map(user => (
              <TouchableOpacity
                key={user.id}
                style={styles.userItem}
                onPress={() => startChat(user)}
              >
                <View style={styles.userAvatar}>
                  <Text style={styles.avatarText}>{user.username[0].toUpperCase()}</Text>
                  {user.isOnline && (
                    <View style={[styles.statusDot, { backgroundColor: '#4CAF50', position: 'absolute', right: 0, bottom: 0 }]} />
                  )}
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.username}</Text>
                  <Text style={styles.userStatus}>
                    {user.isOnline ? 'Online' : `Last seen ${formatLastSeen(user.lastSeen)}`}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // CHAT SCREEN
  if (currentScreen === 'chat') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#f0f2f5' }]}>
        <StatusBar style="dark" />
        <View style={styles.chatHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen('home')}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Image source={selectedUser.avatar} style={styles.chatAvatar} />
          <View style={styles.chatUserInfo}>
            <Text style={styles.chatUserName}>{selectedUser.username}</Text>
            <Text style={styles.chatUserStatus}>
              {selectedUser.isOnline ? 'Online' : `Last seen ${formatLastSeen(selectedUser.lastSeen)}`}
            </Text>
            {otherUserTyping && (
              <Text style={styles.typingIndicator}>typing...</Text>
            )}
          </View>
          <TouchableOpacity style={styles.chatMenuButton}>
            <Text style={styles.chatMenuText}>⋮</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[
              styles.messageContainer,
              item.sender === 'You' ? styles.myMessage : styles.otherMessage
            ]}>
              <View style={{ flexDirection: item.sender === 'You' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                <Image source={item.avatar} style={styles.bubbleAvatar} />
                <View style={[
                  styles.messageBubble,
                  item.sender === 'You' ? styles.myMessageBubble : styles.otherMessageBubble,
                  { shadowOpacity: item.sender === 'You' ? 0 : 0.08 }
                ]}>
                  <Text style={[
                    styles.messageText,
                    item.sender === 'You' ? styles.myMessageText : styles.otherMessageText
                  ]}>
                    {item.text}
                    {item.edited ? <Text style={{ fontSize: 10, color: '#888' }}> (edited)</Text> : null}
                  </Text>
                  <View style={styles.messageFooter}>
                    <Text style={[
                      styles.messageTime,
                      item.sender === 'You' ? styles.myMessageTime : styles.otherMessageTime
                    ]}>
                      {formatTime(item.time)}
                    </Text>
                    {item.sender === 'You' ? (
                      <Text style={[
                        styles.messageStatus,
                        item.status === 'read' ? styles.readStatus : styles.deliveredStatus
                      ]}>
                        {getMessageStatusIcon(item.status)}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          )}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
          inverted={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {isTyping && (
          <View style={styles.typingContainer}>
            <Text style={styles.typingText}>You are typing...</Text>
          </View>
        )}

        <View style={styles.messageInputContainer}>
          <View style={styles.messageInputWrapper}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              placeholderTextColor="#666"
              value={newMessage}
              onChangeText={(text) => {
                setNewMessage(text);
                setIsTyping(text.length > 0);
              }}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
              onPress={sendMessage}
              disabled={!newMessage.trim()}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Default fallback
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
