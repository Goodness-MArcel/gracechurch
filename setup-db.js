import { sequelize, connectDB } from './src/lib/db.js';
import db from './models/index.js';
import { execSync } from 'child_process';

async function setupDatabase() {
  try {
    await connectDB();

    // Run migrations using Sequelize CLI
    console.log('Running migrations...');
    execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });

    // Create admin user (only if doesn't exist)
    console.log('Checking admin user...');
    let adminUser = await db.User.findOne({ where: { email: 'admin@gracechurch.com' } });
    if (!adminUser) {
      console.log('Creating admin user...');
      adminUser = await db.User.create({
        email: 'admin@gracechurch.com',
        password: 'admin123', // This will be hashed by the model hook
        firstName: 'Admin',
        lastName: 'User'
      });
      console.log('Admin user created:', {
        email: adminUser.email
      });
    } else {
      console.log('Admin user already exists');
    }

    // Create sample events (only if none exist)
    console.log('Checking existing events...');
    const existingEventsCount = await db.Event.count();
    if (existingEventsCount === 0) {
      console.log('Creating sample events...');
      const sampleEvents = [
        {
          title: 'Sunday Worship Service',
          description: 'Join us for our weekly Sunday worship service featuring inspiring music, powerful preaching, and a welcoming community. All are welcome to experience God\'s love and grace.',
          date: '2026-01-12',
          time: '10:00',
          location: 'Main Sanctuary',
          image: null
        },
        {
          title: 'Community Prayer Meeting',
          description: 'A time of prayer and fellowship for our church community. Come share your prayer requests and experience the power of collective prayer.',
          date: '2026-01-15',
          time: '19:00',
          location: 'Fellowship Hall',
          image: null
        },
        {
          title: 'Youth Bible Study',
          description: 'Engaging Bible study sessions for young adults aged 18-30. Explore God\'s word together and grow in faith through discussion and fellowship.',
          date: '2026-01-17',
          time: '18:30',
          location: 'Youth Center',
          image: null
        },
        {
          title: 'Community Outreach Program',
          description: 'Serve our local community through various outreach activities including food distribution, clothing drives, and neighborhood assistance.',
          date: '2026-01-20',
          time: '14:00',
          location: 'Community Center',
          image: null
        },
        {
          title: 'Women\'s Ministry Gathering',
          description: 'A special gathering for women of all ages to connect, share, and grow in their faith journey. Featuring guest speakers and fellowship activities.',
          date: '2026-01-22',
          time: '16:00',
          location: 'Main Sanctuary',
          image: null
        },
        {
          title: 'Men\'s Breakfast Fellowship',
          description: 'Start your week with fellowship, prayer, and encouragement. Join us for breakfast and meaningful conversations about faith and life.',
          date: '2026-01-25',
          time: '08:00',
          location: 'Fellowship Hall',
          image: null
        }
      ];

      for (const eventData of sampleEvents) {
        await db.Event.create(eventData);
        console.log(`Created event: ${eventData.title}`);
      }

      console.log('Sample events created successfully!');
    } else {
      console.log(`Events already exist (${existingEventsCount} events found)`);
    }
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();