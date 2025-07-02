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

    await client.query(
      `INSERT INTO waitlist
      (name, email, profession, age, prayer_frequency, arabic_understanding, difficulty_understanding,
       importance_of_understanding, biggest_struggle, ar_interest, valuable_features, barriers,
       payment_willingness, budget_range, likelihood, additional_feedback, interview_willingness,
       investor_presentation_interest)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
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
        data.paymentWillingness,
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
