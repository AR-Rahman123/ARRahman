// Test script to verify Neon database connection
// Run this with: node test-db-connection.js

import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database functions (copied from database.ts for testing)
async function initializeWaitlistTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        profession VARCHAR(255),
        age VARCHAR(50),
        prayer_frequency VARCHAR(100),
        arabic_understanding VARCHAR(100),
        difficulty_understanding VARCHAR(100),
        importance_of_understanding VARCHAR(100),
        biggest_struggle VARCHAR(255),
        ar_interest VARCHAR(100),
        valuable_features TEXT[],
        barriers TEXT[],
        payment_willingness VARCHAR(100),
        budget_range VARCHAR(100),
        likelihood VARCHAR(100),
        additional_feedback TEXT,
        interview_willingness VARCHAR(100),
        investor_presentation_interest VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Waitlist table initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Error initializing waitlist table:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

async function saveWaitlistEntry(data) {
  try {
    await initializeWaitlistTable();

    const result = await sql`
      INSERT INTO waitlist (
        name, email, profession, age, prayer_frequency,
        arabic_understanding, difficulty_understanding, importance_of_understanding,
        biggest_struggle, ar_interest, valuable_features, barriers,
        payment_willingness, budget_range, likelihood, additional_feedback,
        interview_willingness, investor_presentation_interest
      ) VALUES (
        ${data.name},
        ${data.email},
        ${data.profession},
        ${data.age},
        ${data.prayer_frequency},
        ${data.arabic_understanding},
        ${data.difficulty_understanding},
        ${data.importance_of_understanding},
        ${data.biggest_struggle},
        ${data.ar_interest},
        ${JSON.stringify(data.valuable_features)},
        ${JSON.stringify(data.barriers)},
        ${data.payment_willingness},
        ${data.budget_range},
        ${data.likelihood},
        ${data.additional_feedback},
        ${data.interview_willingness},
        ${data.investor_presentation_interest}
      )
      RETURNING id, created_at
    `;

    console.log('Waitlist entry saved successfully:', result.rows[0]);
    return { 
      success: true, 
      data: result.rows[0],
      message: 'Successfully saved to database'
    };
  } catch (error) {
    console.error('Error saving waitlist entry:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return { 
        success: false, 
        error: 'Email already exists in our waitlist',
        code: 'DUPLICATE_EMAIL'
      };
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to save to database',
      code: 'DATABASE_ERROR'
    };
  }
}

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