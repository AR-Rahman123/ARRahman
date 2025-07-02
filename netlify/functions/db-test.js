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
async function submitWaitlist(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    profession: document.getElementById('profession').value,
    age: document.getElementById('age').value,
    prayerFrequency: document.getElementById('prayerFrequency').value,
    arabicUnderstanding: document.getElementById('arabicUnderstanding').value,
    difficultyUnderstanding: document.getElementById('difficultyUnderstanding').value,
    importanceOfUnderstanding: document.getElementById('importanceOfUnderstanding').value,
    biggestStruggle: document.getElementById('biggestStruggle').value,
    arInterest: document.getElementById('arInterest').value,
    valuableFeatures: Array.from(document.querySelectorAll('input[name="valuableFeatures"]:checked')).map(el => el.value),
    barriers: Array.from(document.querySelectorAll('input[name="barriers"]:checked')).map(el => el.value),
    paymentWillingness: document.getElementById('paymentWillingness').value,
    budgetRange: document.getElementById('budgetRange').value,
    likelihood: document.getElementById('likelihood').value,
    additionalFeedback: document.getElementById('additionalFeedback').value,
    interviewWillingness: document.getElementById('interviewWillingness').value,
    investorPresentationInterest: document.getElementById('investorPresentationInterest').value
  };

  const response = await fetch("https://www.ar-rahman.ai/.netlify/functions/db-test", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  const result = await response.json();
  console.log(result);
}

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
