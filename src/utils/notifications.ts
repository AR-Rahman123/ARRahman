// Notification utilities for form submissions

export interface NotificationData {
  name: string;
  email: string;
  profession: string;
  responses: Record<string, any>;
  timestamp: string;
}

// Option 1: Email notification using EmailJS (Free tier available)
export const sendEmailNotification = async (data: NotificationData) => {
  try {
    // You'll need to sign up at https://www.emailjs.com/
    // Replace these with your actual EmailJS credentials
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'YOUR_SERVICE_ID',
        template_id: 'YOUR_TEMPLATE_ID',
        user_id: 'YOUR_PUBLIC_KEY',
        template_params: {
          to_email: 'your-email@example.com',
          from_name: 'AR Qur\'an Waitlist',
          subject: 'New Waitlist Signup',
          message: `
            New waitlist signup:
            Name: ${data.name}
            Email: ${data.email}
            Profession: ${data.profession}
            Timestamp: ${data.timestamp}
            
            Full responses: ${JSON.stringify(data.responses, null, 2)}
          `
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email notification');
    }

    return { success: true };
  } catch (error) {
    console.error('Email notification error:', error);
    return { success: false, error };
  }
};

// Option 2: Webhook notification (works with Zapier, Make.com, IFTTT, etc.)
export const sendWebhookNotification = async (data: NotificationData) => {
  try {
    // Replace with your webhook URL from Zapier, Make.com, or custom endpoint
    const webhookUrl = 'YOUR_WEBHOOK_URL_HERE';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'waitlist_signup',
        data: data
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send webhook notification');
    }

    return { success: true };
  } catch (error) {
    console.error('Webhook notification error:', error);
    return { success: false, error };
  }
};

// Option 3: Push notification using Pusher (Real-time notifications)
export const sendPushNotification = async (data: NotificationData) => {
  try {
    // You'll need to sign up at https://pusher.com/
    // Replace with your Pusher credentials
    const response = await fetch('https://api.pusherapp.com/apps/YOUR_APP_ID/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_AUTH_TOKEN'
      },
      body: JSON.stringify({
        name: 'waitlist-signup',
        channel: 'notifications',
        data: JSON.stringify(data)
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send push notification');
    }

    return { success: true };
  } catch (error) {
    console.error('Push notification error:', error);
    return { success: false, error };
  }
};

// Option 4: SMS notification using Twilio
export const sendSMSNotification = async (data: NotificationData) => {
  try {
    // You'll need to sign up at https://www.twilio.com/
    // This would typically be done from your backend for security
    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'YOUR_PHONE_NUMBER',
        message: `New AR Qur'an waitlist signup: ${data.name} (${data.email})`
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send SMS notification');
    }

    return { success: true };
  } catch (error) {
    console.error('SMS notification error:', error);
    return { success: false, error };
  }
};

// Main notification function that tries multiple methods
export const sendAllNotifications = async (data: NotificationData) => {
  const results = await Promise.allSettled([
    sendEmailNotification(data),
    sendWebhookNotification(data),
    sendPushNotification(data),
    sendSMSNotification(data)
  ]);

  const successful = results.filter(result => 
    result.status === 'fulfilled' && result.value.success
  ).length;

  console.log(`${successful}/${results.length} notifications sent successfully`);
  
  return {
    total: results.length,
    successful,
    results
  };
};