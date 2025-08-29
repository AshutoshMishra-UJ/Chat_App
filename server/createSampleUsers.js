require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const sampleUsers = [
    {
        username: 'alice',
        email: 'alice@example.com',
        password: 'password123'
    },
    {
        username: 'bob',
        email: 'bob@example.com',
        password: 'password123'
    },
    {
        username: 'charlie',
        email: 'charlie@example.com',
        password: 'password123'
    },
    {
        username: 'diana',
        email: 'diana@example.com',
        password: 'password123'
    }
];

async function createSampleUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing users (optional)
        console.log('🧹 Clearing existing users...');
        await User.deleteMany({});

        // Create sample users
        console.log('👥 Creating sample users...');
        for (const userData of sampleUsers) {
            const user = new User(userData);
            await user.save();
            console.log(`✅ Created user: ${user.username} (${user.email})`);
        }

        console.log('\n🎉 Sample users created successfully!');
        console.log('\nYou can now use these credentials to test the app:');
        sampleUsers.forEach(user => {
            console.log(`- Username: ${user.username}, Email: ${user.email}, Password: ${user.password}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating sample users:', error);
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    createSampleUsers();
}

module.exports = { createSampleUsers };
