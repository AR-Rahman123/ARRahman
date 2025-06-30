import React from 'react';
import { ScoreResult } from '../types/quiz';
import { Share2, Download, RotateCcw, Trophy, Target, Lightbulb } from 'lucide-react';

interface ResultsProps {
  result: ScoreResult;
  userName: string;
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, userName, onRestart }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Beginner':
        return 'from-orange-400 to-red-500';
      case 'Builder':
        return 'from-blue-400 to-purple-500';
      case 'Influencer':
        return 'from-green-400 to-teal-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Beginner':
        return Target;
      case 'Builder':
        return Lightbulb;
      case 'Influencer':
        return Trophy;
      default:
        return Target;
    }
  };

  const Icon = getTierIcon(result.tier);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Personal Brand Score',
          text: `I just scored ${result.score}/100 on my Personal Brand assessment! I'm a ${result.tier}. Take the quiz to discover your score!`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I just scored ${result.score}/100 on my Personal Brand assessment! I'm a ${result.tier}. Take the quiz: ${window.location.href}`;
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  const handleDownload = () => {
    // Simulate PDF download - in real implementation, you'd generate a PDF
    alert('Your personalized growth plan will be sent to your email shortly!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Score Display */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 bg-gradient-to-r ${getTierColor(result.tier)} rounded-full flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Congratulations, {userName}!
            </h1>

            <div className="mb-6">
              <div className="text-6xl md:text-8xl font-bold mb-2">
                <span className={`bg-gradient-to-r ${getTierColor(result.tier)} bg-clip-text text-transparent`}>
                  {result.score}
                </span>
                <span className="text-gray-400 text-4xl md:text-5xl">/100</span>
              </div>
              <div className={`inline-flex items-center px-6 py-2 rounded-full text-white text-lg font-semibold bg-gradient-to-r ${getTierColor(result.tier)}`}>
                {result.tier}
              </div>
            </div>

            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              {result.title}
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {result.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span>Get My Growth Plan</span>
              </button>
              
              <button
                onClick={handleShare}
                className="inline-flex items-center space-x-2 bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-600 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
                <span>Share My Score</span>
              </button>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Your Personalized Action Plan
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {result.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 font-medium">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Restart Button */}
          <button
            onClick={onRestart}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 font-semibold transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Take Quiz Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};