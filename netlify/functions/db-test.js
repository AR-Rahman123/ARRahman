const { Client } = require('pg');

exports.handler = async (event, context) => {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (parseError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON', details: parseError.message })
    };
  }

  // Validate required fields
  if (!data.name || !data.email) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Name and email are required' })
    };
  }

  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Database configuration missing' })
    };
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('Connected to database successfully');

    // Create table if it doesn't exist
    await client.query(`
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
    `);
    console.log('Table ensured');

    // Insert the data
    const insertResult = await client.query(
      `INSERT INTO waitlist
      (name, email, profession, age, prayer_frequency, arabic_understanding, difficulty_understanding,
       importance_of_understanding, biggest_struggle, ar_interest, valuable_features, barriers,
       payment_willingness, budget_range, likelihood, additional_feedback, interview_willingness,
       investor_presentation_interest)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING id, created_at`,
      [
        data.name,
        data.email,
        data.profession || '',
        data.age || '',
        data.prayerFrequency || '',
        data.arabicUnderstanding || '',
        data.difficultyUnderstanding || '',
        data.importanceOfUnderstanding || '',
        data.biggestStruggle || '',
        data.arInterest || '',
        Array.isArray(data.valuableFeatures) ? data.valuableFeatures : [],
        Array.isArray(data.barriers) ? data.barriers : [],
        data.paymentWillingness || '',
        data.budgetRange || '',
        data.likelihood || '',
        data.additionalFeedback || '',
        data.interviewWillingness || '',
        data.investorPresentationInterest || ''
      ]
    );

    await client.end();
    console.log('Data inserted successfully:', insertResult.rows[0]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        data: insertResult.rows[0],
        message: 'Successfully saved to database'
      }),
    };
  } catch (error) {
    console.error('Database error:', error);
    
    try {
      await client.end();
    } catch (endError) {
      console.error('Error closing connection:', endError);
    }

    // Handle specific database errors
    if (error.code === '23505') { // Unique constraint violation
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ 
          error: 'Duplicate entry', 
          details: 'This email is already registered',
          code: 'DUPLICATE_EMAIL' 
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Database error', 
        details: error.message,
        code: error.code 
      }),
    };
  }
};
