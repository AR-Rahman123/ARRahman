import { QuizAnswer, ScoreResult } from '../types/quiz';

export const calculateScore = (answers: QuizAnswer[]): ScoreResult => {
  let totalScore = 0;
  
  // Score calculation logic
  answers.forEach((answer) => {
    if (typeof answer.value === 'string') {
      switch (answer.questionId) {
        case 3: // Online presence
          const presenceScores = { 'Non-existent': 0, 'I post occasionally but nothing consistent': 10, 'I post regularly on 1 platform': 20, 'I have a strong presence across multiple platforms': 25 };
          totalScore += presenceScores[answer.value as keyof typeof presenceScores] || 0;
          break;
        case 5: // Brand message
          const messageScores = { 'No, I haven\'t defined it': 0, 'Somewhat, but it\'s not clear': 10, 'Yes, and it\'s communicated clearly across platforms': 20 };
          totalScore += messageScores[answer.value as keyof typeof messageScores] || 0;
          break;
        case 6: // Content quality
          const qualityScores = { 'I don\'t post much': 0, 'Basic content, not very strategic': 8, 'Good quality, but inconsistent': 15, 'High quality and very intentional': 20 };
          totalScore += qualityScores[answer.value as keyof typeof qualityScores] || 0;
          break;
        case 7: // Engagement
          const engagementScores = { 'Rarely': 0, 'Occasionally': 8, 'Consistently': 15, 'Very frequently': 20 };
          totalScore += engagementScores[answer.value as keyof typeof engagementScores] || 0;
          break;
        case 8: // Monetization
          const monetizationScores = { 'Not yet': 0, 'A little, but not consistently': 5, 'Yes, somewhat regularly': 10, 'Yes, consistently and successfully': 15 };
          totalScore += monetizationScores[answer.value as keyof typeof monetizationScores] || 0;
          break;
      }
    } else if (Array.isArray(answer.value) && answer.questionId === 4) {
      // Platforms - score based on number of platforms
      totalScore += Math.min(answer.value.length * 2, 10);
    }
  });

  // Determine tier and create result
  if (totalScore <= 40) {
    return {
      score: totalScore,
      tier: 'Beginner',
      title: 'You\'re just getting started – time to define your brand and start showing up.',
      description: 'Don\'t worry, everyone starts somewhere! You have a solid foundation to build upon.',
      recommendations: [
        'Define your personal brand message and mission',
        'Choose 1-2 platforms to focus on initially',
        'Create a content calendar and post consistently',
        'Engage authentically with your audience'
      ]
    };
  } else if (totalScore <= 70) {
    return {
      score: totalScore,
      tier: 'Builder',
      title: 'You\'ve made progress – now focus on consistency and expanding your reach.',
      description: 'You\'re building momentum! Time to refine your strategy and scale your efforts.',
      recommendations: [
        'Optimize your content quality and posting schedule',
        'Expand to additional relevant platforms',
        'Build strategic partnerships and collaborations',
        'Start exploring monetization opportunities'
      ]
    };
  } else {
    return {
      score: totalScore,
      tier: 'Influencer',
      title: 'You\'ve built a solid brand – refine and scale your influence.',
      description: 'Impressive! You\'re ahead of most creators. Time to maximize your impact.',
      recommendations: [
        'Scale your monetization strategies',
        'Create premium content and products',
        'Build thought leadership in your niche',
        'Mentor others and expand your influence'
      ]
    };
  }
};