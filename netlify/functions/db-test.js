import { Client } from 'pg';

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // Create table if it doesn't exist (updated schema without payment_willingness)
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
        budget_range VARCHAR(100),
        likelihood VARCHAR(100),
        additional_feedback TEXT,
        interview_willingness VARCHAR(100),
        investor_presentation_interest VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert the data (removed payment_willingness field)
    await client.query(
      `INSERT INTO waitlist
      (name, email, profession, age, prayer_frequency, arabic_understanding, difficulty_understanding,
       importance_of_understanding, biggest_struggle, ar_interest, valuable_features, barriers,
       budget_range, likelihood, additional_feedback, interview_willingness,
       investor_presentation_interest)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
      [
        data.name,
        data.email,
        data.profession,
        data.age,
        data.prayerFrequency,
        data.arabicUnderstanding,
        data.difficultyUnderstanding,
        data.importanceOfUnderstanding,
        data.biggestStruggle,
        data.arInterest,
        data.valuableFeatures, // array
        data.barriers,         // array
        data.budgetRange,
        data.likelihood,
        data.additionalFeedback,
        data.interviewWillingness,
        data.investorPresentationInterest
      ]
    );

    await client.end();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Database error', details: error.message }),
    };
  }
}