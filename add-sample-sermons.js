const { db } = require('./src/lib/db');

async function addSampleSermons() {
  try {
    console.log('Adding sample sermons...');

    const sampleSermons = [
      {
        title: 'Walking in Faith',
        speaker: 'Pastor John Smith',
        date: '2026-01-05',
        scripture: 'Proverbs 3:5-6',
        duration: '35 minutes',
        description: 'In this powerful message, Pastor John explores what it means to truly trust in God\'s plan for our lives.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        featured: true
      },
      {
        title: 'The Power of Prayer',
        speaker: 'Pastor Sarah Johnson',
        date: '2026-01-02',
        scripture: 'Matthew 6:9-13',
        duration: '42 minutes',
        description: 'Discover the transformative power of prayer in your daily walk with Christ.',
        featured: false
      },
      {
        title: 'Love Your Neighbor',
        speaker: 'Pastor Michael Davis',
        date: '2025-12-22',
        scripture: 'Luke 10:25-37',
        duration: '38 minutes',
        description: 'Understanding what it truly means to love our neighbors as ourselves.',
        featured: false
      }
    ];

    for (const sermon of sampleSermons) {
      await db.Sermon.create(sermon);
      console.log(`Created sermon: ${sermon.title}`);
    }

    console.log('Sample sermons added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample sermons:', error);
    process.exit(1);
  }
}

addSampleSermons();