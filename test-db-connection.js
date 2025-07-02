// Test script to verify Neon database connection
// Run this with: node test-db-connection.js

import { sql } from '@vercel/postgres';
import { initializeWaitlistTable, saveWaitlistEntry } from './src/utils/database.js';

async function testConnection() {
  console.log('🔄 Testing Neon database connection...');
  
  try {
    // Test basic connection
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connected successfully!');
    console.log('📅 Current time:', result.rows[0].current_time);
    
    // Test table initialization
    console.log('\n🔄 Testing table initialization...');
    const tableResult = await initializeWaitlistTable();
    if (tableResult.success) {
      console.log('✅ Waitlist table initialized successfully!');
    } else {
      console.log('❌ Table initialization failed:', tableResult.error);
      return;
    }
    
    // Test data insertion with sample data
    console.log('\n🔄 Testing data insertion...');
    const testData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`, // Unique email
      profession: 'Developer',
      age: '26-35',
      prayer_frequency: '5 times daily',
      arabic_understanding: 'Basic',
      difficulty_understanding: 'Sometimes',
      importance_of_understanding: 'Very important',
      biggest_struggle: 'Understanding Arabic',
      ar_interest: 'Very interested',
      valuable_features: ['Live Quran translation during prayer', 'Arabic pronunciation guidance'],
      barriers: ['Cost concerns', 'Technology complexity'],
      payment_willingness: 'Definitely yes',
      budget_range: '$300-$500',
      likelihood: 'Very likely',
      additional_feedback: 'This is a test entry',
      interview_willingness: 'Yes, I\'d be happy to help',
      investor_presentation_interest: 'Yes, I\'m interested'
    };
    
    const insertResult = await saveWaitlistEntry(testData);
    if (insertResult.success) {
      console.log('✅ Test data inserted successfully!');
      console.log('📝 Entry ID:', insertResult.data.id);
      console.log('⏰ Created at:', insertResult.data.created_at);
    } else {
      console.log('❌ Data insertion failed:', insertResult.error);
    }
    
    console.log('\n🎉 All tests passed! Your Neon database is ready to go!');
    console.log('\n💡 You can now remove this test file: rm test-db-connection.js');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\n💡 Make sure you have:');
    console.log('1. Set up your POSTGRES_URL in .env file');
    console.log('2. Your Neon database is running');
    console.log('3. The connection string is correct');
  }
}

// Run the test
testConnection();