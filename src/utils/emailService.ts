import emailjs from '@emailjs/browser';

// EmailJS configuration - Replace these with your actual values
const EMAILJS_CONFIG = {
  serviceId: "service_xjizkqm", // Replace with your EmailJS service ID
  templateId: "template_4alhysb", // Replace with your EmailJS template ID
  confirmationTemplateId: "template_f4hrejv", // Replace with your confirmation template ID
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
  console.log('🚀 Starting confirmation email process...');
  console.log('📧 Target email:', userEmail);
  console.log('👤 User name:', userName);
  console.log('🔧 EmailJS Config:', {
    serviceId: EMAILJS_CONFIG.serviceId,
    templateId: EMAILJS_CONFIG.confirmationTemplateId,
    publicKey: EMAILJS_CONFIG.publicKey ? 'Set' : 'Missing'
  });

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

    console.log('📝 Template parameters prepared:', {
      to_email: templateParams.to_email,
      user_name: templateParams.user_name,
      subject: templateParams.subject,
      parametersCount: Object.keys(templateParams).length
    });

    console.log('📤 Sending email via EmailJS...');
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.confirmationTemplateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ EmailJS Response:', response);
    console.log('📊 Response details:', {
      status: response.status,
      text: response.text,
      serviceId: EMAILJS_CONFIG.serviceId,
      templateId: EMAILJS_CONFIG.confirmationTemplateId
    });

    // Check response status
    if (response.status === 200) {
      console.log('🎉 Email sent successfully!');
      console.log('📧 Please check:', userEmail);
      console.log('📁 Also check: Spam/Junk folder, Promotions tab');
      
      // Store the email attempt for debugging
      if (typeof window !== 'undefined') {
        (window as any).lastEmailAttempt = {
          email: userEmail,
          name: userName,
          timestamp: new Date().toISOString(),
          response: response,
          templateParams: templateParams
        };
        console.log('💾 Email attempt saved to window.lastEmailAttempt for debugging');
      }
      
      return true;
    } else {
      console.error('❌ Unexpected response status:', response.status);
      return false;
    }
  } catch (error: any) {
    console.error('❌ Failed to send confirmation email:', error);
    console.error('🔍 Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    
    // Check for specific EmailJS errors
    if (error.message?.includes('template')) {
      console.error('🚨 Template Error: Check if template ID is correct:', EMAILJS_CONFIG.confirmationTemplateId);
    }
    if (error.message?.includes('service')) {
      console.error('🚨 Service Error: Check if service ID is correct:', EMAILJS_CONFIG.serviceId);
    }
    if (error.message?.includes('public')) {
      console.error('🚨 Public Key Error: Check if public key is correct');
    }
    
    return false;
  }
};
