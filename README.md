# AR Rahman Landing Page

A modern, responsive landing page for an Augmented Reality Qur'an experience with comprehensive waitlist functionality.

## Features

- ✨ Beautiful, modern design with spiritual aesthetics
- 📱 Fully responsive mobile-first design
- 🎥 Video integration in hero section
- 📊 Progress bar for multi-step form
- 📄 Individual pages for each question
- 🔔 Multiple notification options for form submissions
- 🎯 Comprehensive waitlist with detailed questionnaire

## Video Integration

### Adding Your Video

1. **Replace the placeholder in Hero component:**
   ```jsx
   // In src/components/Hero.tsx, uncomment and update:
   <video 
     className="w-full h-full object-cover"
     poster="YOUR_POSTER_IMAGE_URL"
     controls
   >
     <source src="YOUR_VIDEO_URL.mp4" type="video/mp4" />
     Your browser does not support the video tag.
   </video>
   ```

2. **Video hosting options:**
   - **YouTube/Vimeo:** Use iframe embed
   - **Self-hosted:** Upload to your server
   - **CDN:** Use services like Cloudinary, AWS S3
   - **Stock videos:** Pexels, Unsplash (for demo purposes)

### Example with YouTube embed:
```jsx
<iframe
  className="w-full h-full rounded-xl"
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="AR Rahman Demo"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
```

## Notification Setup

The form includes multiple notification options to alert you when someone joins the waitlist:

### 1. Email Notifications (EmailJS)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update `src/utils/emailService.ts`:
   ```javascript
   service_id: 'YOUR_SERVICE_ID',
   template_id: 'YOUR_TEMPLATE_ID',
   user_id: 'YOUR_PUBLIC_KEY',
   ```

### 2. Webhook Notifications

**Zapier Integration:**
1. Create a Zapier account
2. Create a new Zap with "Webhooks by Zapier" trigger
3. Copy the webhook URL
4. Update `src/utils/notifications.ts`:
   ```javascript
   const webhookUrl = 'YOUR_ZAPIER_WEBHOOK_URL';
   ```

**Make.com (formerly Integromat):**
1. Create a Make.com account
2. Create a new scenario with HTTP webhook
3. Copy the webhook URL
4. Update the webhook URL in notifications.ts

### 3. SMS Notifications (Twilio)

1. Sign up at [Twilio](https://www.twilio.com/)
2. Get your Account SID and Auth Token
3. Create a backend endpoint to handle SMS:
   ```javascript
   // Example backend endpoint (Node.js/Express)
   app.post('/api/send-sms', async (req, res) => {
     const client = twilio(accountSid, authToken);
     
     try {
       await client.messages.create({
         body: req.body.message,
         from: 'YOUR_TWILIO_PHONE_NUMBER',
         to: req.body.to
       });
       res.json({ success: true });
     } catch (error) {
       res.status(500).json({ success: false, error });
     }
   });
   ```

### 4. Push Notifications (Pusher)

1. Sign up at [Pusher](https://pusher.com/)
2. Create a new app
3. Get your app credentials
4. Update `src/utils/notifications.ts` with your credentials

### 5. Simple Email Setup (No-code solution)

**Using Formspree:**
1. Sign up at [Formspree](https://formspree.io/)
2. Create a new form
3. Replace the notification function with:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data)
   });
   ```

## Form Features

### Progress Bar
- Shows completion percentage
- Updates in real-time as user progresses
- Visual feedback for better UX

### Individual Question Pages
- Each question on separate page
- Smooth transitions between questions
- Back/forward navigation
- Form validation per question

### Question Types Supported
- Radio buttons (single choice)
- Checkboxes (multiple choice with limits)
- Text areas (open-ended responses)
- Input validation and error handling

## Customization

### Adding New Questions
Edit `src/components/WaitlistForm.tsx`:

```javascript
const questions = [
  // Add new question object
  {
    id: 'newQuestion',
    title: 'Your question here?',
    type: 'radio', // or 'checkbox', 'textarea'
    options: ['Option 1', 'Option 2', 'Option 3'],
    optional: false // or true
  }
];
```

### Styling
- Uses Tailwind CSS for styling
- Gradient themes with purple/blue color scheme
- Responsive design with mobile-first approach
- Smooth animations and transitions

## Deployment

The app is ready for deployment on:
- Netlify (recommended)
- Vercel
- GitHub Pages
- Any static hosting service

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Configure notifications in `src/utils/emailService.ts`
5. Add your video content
6. Deploy to your preferred platform

## Support

For questions about implementation or customization, refer to the documentation of the respective services:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Zapier Webhooks](https://zapier.com/help/create/code-webhooks/)
- [Twilio SMS API](https://www.twilio.com/docs/sms)
- [Pusher Documentation](https://pusher.com/docs/)