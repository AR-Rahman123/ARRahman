import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    type: 'text',
    question: 'What is your first name?',
    required: true,
    placeholder: 'Enter your first name'
  },
  {
    id: 2,
    type: 'email',
    question: 'What is your email address?',
    required: true,
    placeholder: 'Enter your email address'
  },
  {
    id: 3,
    type: 'single',
    question: 'How would you describe your current online presence?',
    required: true,
    options: [
      'Non-existent',
      'I post occasionally but nothing consistent',
      'I post regularly on 1 platform',
      'I have a strong presence across multiple platforms'
    ]
  },
  {
    id: 4,
    type: 'multiple',
    question: 'What platforms are you most active on?',
    required: true,
    options: [
      'Instagram',
      'TikTok',
      'LinkedIn',
      'YouTube',
      'X (Twitter)',
      'Podcasting',
      'Other'
    ]
  },
  {
    id: 5,
    type: 'single',
    question: 'Do you currently have a clear personal brand message or mission?',
    required: true,
    options: [
      'No, I haven\'t defined it',
      'Somewhat, but it\'s not clear',
      'Yes, and it\'s communicated clearly across platforms'
    ]
  },
  {
    id: 6,
    type: 'single',
    question: 'How would you rate your content quality?',
    required: true,
    options: [
      'I don\'t post much',
      'Basic content, not very strategic',
      'Good quality, but inconsistent',
      'High quality and very intentional'
    ]
  },
  {
    id: 7,
    type: 'single',
    question: 'How often do people engage with your content (likes, shares, comments)?',
    required: true,
    options: [
      'Rarely',
      'Occasionally',
      'Consistently',
      'Very frequently'
    ]
  },
  {
    id: 8,
    type: 'single',
    question: 'Do you currently monetize your brand (coaching, products, speaking, etc.)?',
    required: true,
    options: [
      'Not yet',
      'A little, but not consistently',
      'Yes, somewhat regularly',
      'Yes, consistently and successfully'
    ]
  },
  {
    id: 9,
    type: 'textarea',
    question: 'What\'s your biggest personal brand goal right now?',
    required: true,
    placeholder: 'e.g., "Build a loyal audience", "Get speaking gigs", "Monetize my expertise"'
  }
];