import emailjs from '@emailjs/browser';

// EmailJS configuration - Replace these with your actual values
const EMAILJS_CONFIG = {
  serviceId: "service_xjizkqm", // Replace with your EmailJS service ID
  templateId: "template_4alhysb", // Replace with your EmailJS template ID
  confirmationTemplateId: "template_confirmation_id", // Replace with your confirmation template ID
  publicKey: "ye3twwVcfp0jM_o2z", // Replace with your EmailJS public key
};

export interface WaitlistData {
  name: string;
  email: string;
  profession: string;
  age: string;
  prayerFrequency: string;
  arabicUnderstanding: string;
  difficultyUnderstanding: string;
  importanceOfUnderstanding: string;
  biggestStruggle: string;
  arInterest: string;
  valuableFeatures: string[];
  barriers: string[];
  likelihood: string;
  additionalFeedback: string;
  interviewWillingness: string;
  investorPresentationInterest: string;
}

export const sendWaitlistNotification = async (data: WaitlistData): Promise<boolean> => {
  try {
    // Format the data for the email template
    const templateParams = {
      to_email: 'maliksubscription@gmail.com', // Replace with your email
      from_name: 'AR Rahman Waitlist',
      subject: 'New Waitlist Signup - AR Rahman',
      user_name: data.name,
      user_email: data.email,
      user_profession: data.profession,
      user_age: data.age,
      prayer_frequency: data.prayerFrequency,
      arabic_understanding: data.arabicUnderstanding,
      difficulty_understanding: data.difficultyUnderstanding,
      importance_understanding: data.importanceOfUnderstanding,
      biggest_struggle: data.biggestStruggle,
      ar_interest: data.arInterest,
      valuable_features: data.valuableFeatures.join(', '),
      barriers: data.barriers.join(', '),
      likelihood: data.likelihood,
      additional_feedback: data.additionalFeedback,
      interview_willingness: data.interviewWillingness,
      investor_presentation_interest: data.investorPresentationInterest,
      timestamp: new Date().toLocaleString(),
      // Full response as JSON for detailed view
      full_response: JSON.stringify(data, null, 2)
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

// Send confirmation email to the user
export const sendConfirmationEmail = async (userEmail: string, userName: string): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: userEmail,
      from_name: 'AR Rahman Team',
      subject: 'Welcome to AR Rahman Waitlist - Your Journey Begins! 🕌',
      user_name: userName,
      greeting: `Assalamu Alaikum ${userName}`,
      main_message: `Thank you for joining the AR Rahman waitlist! We're honored to have you on this revolutionary journey to deepen our connection with the Quran through augmented reality.`,
      what_happens_next: `What happens next:
• You'll receive exclusive updates as we develop the product
• You'll get priority access when we launch
• We may reach out for feedback during development
• Access to special beta testing opportunities`,
      additional_info: `Our mission is to help Muslims around the world understand and connect with the Quran like never before. Your participation in this journey means everything to us.`,
      closing: `Stay tuned for exciting updates, and may Allah bless this endeavor.`,
      signature: `Barakallahu feeki,
The AR Rahman Team`,
      company_info: `AR Rahman - Bringing the Quran to life through technology`,
      // For simpler templates, also include a combined message
      full_message: `Assalamu Alaikum ${userName},

Thank you for joining the AR Rahman waitlist! We're honored to have you on this revolutionary journey to deepen our connection with the Quran through augmented reality.

What happens next:
• You'll receive exclusive updates as we develop the product
• You'll get priority access when we launch
• We may reach out for feedback during development
• Access to special beta testing opportunities

Our mission is to help Muslims around the world understand and connect with the Quran like never before. Your participation in this journey means everything to us.

Stay tuned for exciting updates, and may Allah bless this endeavor.

Barakallahu feeki,
The AR Rahman Team

---
AR Rahman - Bringing the Quran to life through technology`
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.confirmationTemplateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('Confirmation email sent successfully to:', userEmail);
    return true;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
};