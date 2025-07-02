# Neon Database Setup Guide

This guide will help you set up your Neon database connection for the AR Quran Landing Page.

## ✅ Migration Complete!

Your website has been successfully migrated from Supabase to Neon database. All client details from the waitlist form will now be saved to your Neon database.

## 🗃️ Database Schema

The application will automatically create a `waitlist` table with the following structure:

```sql
CREATE TABLE waitlist (
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
  valuable_features TEXT[], -- Array of selected features
  barriers TEXT[], -- Array of selected barriers
  payment_willingness VARCHAR(100),
  budget_range VARCHAR(100),
  likelihood VARCHAR(100),
  additional_feedback TEXT,
  interview_willingness VARCHAR(100),
  investor_presentation_interest VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Setup Instructions

### 1. Create a Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign in or create an account
3. Create a new project
4. Choose your database settings (region, etc.)

### 2. Get Your Connection String

1. In your Neon dashboard, go to **"Connection Details"**
2. Copy the connection string (it looks like this):
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   ```

### 3. Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace `your_neon_database_connection_string_here` with your actual connection string:
   ```env
   POSTGRES_URL=postgresql://your_username:your_password@ep-xxx-xxx.us-east-1.aws.neon.tech/your_dbname?sslmode=require
   ```

### 4. Test Your Connection

Run the test script to verify everything is working:

```bash
node test-db-connection.js
```

If successful, you should see:
- ✅ Database connected successfully!
- ✅ Waitlist table initialized successfully!
- ✅ Test data inserted successfully!

## 📊 What Data is Saved

When users complete the waitlist form, **ALL** the following information is saved to your Neon database:

- **Basic Info**: Name, Email, Profession
- **Demographics**: Age range
- **Prayer Habits**: Prayer frequency, Arabic understanding, difficulty understanding
- **Interest Level**: Importance of understanding, biggest struggle
- **AR Interest**: Interest in AR technology
- **Feature Preferences**: Up to 3 valuable features
- **Barriers**: Potential barriers to adoption
- **Pricing**: Payment willingness, budget range
- **Follow-up**: Likelihood to try, interview willingness
- **Additional**: Feedback, investor presentation interest
- **Metadata**: Automatic timestamp of submission

## 🔒 Security Features

- **Duplicate Prevention**: Email addresses are unique - prevents duplicate signups
- **Error Handling**: Graceful fallback if database connection fails
- **Data Validation**: All form fields are validated before saving
- **Environment Variables**: Database credentials stored securely

## 🔍 Viewing Your Data

To view the data collected in your Neon database:

1. Go to your Neon Console
2. Navigate to "SQL Editor" 
3. Run this query to see all waitlist entries:
   ```sql
   SELECT * FROM waitlist ORDER BY created_at DESC;
   ```

## 🚨 Troubleshooting

### Connection Issues
- Verify your connection string is correct
- Ensure your Neon database is running
- Check that `?sslmode=require` is at the end of the connection string

### Data Not Saving
- Run the test script to check database connection
- Check browser console for error messages
- Verify environment variables are loaded correctly

## 📝 Next Steps

1. **Set up your connection string** in `.env`
2. **Run the test script** to verify everything works
3. **Test the form** on your website to ensure data is being saved
4. **Remove the test script** once everything is working: `rm test-db-connection.js`

Your Neon database is now ready to collect all client details from your waitlist form! 🎉