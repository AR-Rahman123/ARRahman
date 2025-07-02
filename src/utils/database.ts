import { sql } from '@vercel/postgres';

// Interface for the complete waitlist data
export interface WaitlistEntry {
  name: string;
  email: string;
  profession: string;
  age: string;
  prayer_frequency: string;
  arabic_understanding: string;
  difficulty_understanding: string;
  importance_of_understanding: string;
  biggest_struggle: string;
  ar_interest: string;
  valuable_features: string[];
  barriers: string[];
  payment_willingness: string;
  budget_range: string;
  likelihood: string;
  additional_feedback: string;
  interview_willingness: string;
  investor_presentation_interest: string;
  created_at?: Date;
}

// Function to initialize the database table if it doesn't exist
export async function initializeWaitlistTable() {
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
        valuable_features TEXT[], -- Array of strings
        barriers TEXT[], -- Array of strings
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

// Function to save waitlist entry to Neon database
export async function saveWaitlistEntry(data: WaitlistEntry) {
  try {
    // First, ensure the table exists
    await initializeWaitlistTable();

    // Insert the data
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
    
    // Handle specific PostgreSQL errors
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

// Function to get all waitlist entries (for admin purposes)
export async function getAllWaitlistEntries() {
  try {
    const result = await sql`
      SELECT * FROM waitlist 
      ORDER BY created_at DESC
    `;
    
    return { 
      success: true, 
      data: result.rows 
    };
  } catch (error) {
    console.error('Error fetching waitlist entries:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch entries'
    };
  }
}

// Function to check if an email already exists
export async function checkEmailExists(email: string) {
  try {
    const result = await sql`
      SELECT id FROM waitlist WHERE email = ${email}
    `;
    
    return { 
      success: true, 
      exists: result.rows.length > 0 
    };
  } catch (error) {
    console.error('Error checking email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to check email'
    };
  }
}