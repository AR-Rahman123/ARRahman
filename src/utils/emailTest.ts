// Email Test Utility for AR Rahman Waitlist
// This file helps you test the confirmation email functionality

import { sendConfirmationEmail } from './emailService';

export const testConfirmationEmail = async (testEmail: string, testName: string = 'Test User') => {
  console.log('🧪 Testing confirmation email...');
  console.log(`📧 Sending to: ${testEmail}`);
  console.log(`👤 User name: ${testName}`);
  
  try {
    const result = await sendConfirmationEmail(testEmail, testName);
    
    if (result) {
      console.log('✅ Test email sent successfully!');
      console.log('Check your email inbox for the confirmation.');
      return true;
    } else {
      console.log('❌ Test email failed to send.');
      console.log('Check the console for errors.');
      return false;
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return false;
  }
};

// Test function you can call from browser console
// Usage: window.testEmail('your-email@example.com', 'Your Name')
if (typeof window !== 'undefined') {
  (window as any).testEmail = testConfirmationEmail;
}

// Example usage:
// testConfirmationEmail('your-email@example.com', 'Test User');