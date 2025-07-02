import React, { useState } from 'react';
import { X, Mail, User, Briefcase, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { sendWaitlistNotification, sendConfirmationEmail, WaitlistData } from '../utils/emailService';


interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
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
  paymentWillingness: string;
  budgetRange: string;
  likelihood: string;
  additionalFeedback: string;
  interviewWillingness: string;
  investorPresentationInterest: string;
}

const questions = [
  {
    id: 'age',
    title: 'What is your age?',
    type: 'radio',
    options: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+']
  },
  {
    id: 'prayerFrequency',
    title: 'How often do you pray Salah?',
    type: 'radio',
    options: ['5 times daily', '3-4 times daily', '1-2 times daily', 'Weekly', 'Occasionally', 'Rarely']
  },
  {
    id: 'arabicUnderstanding',
    title: 'How would you rate your understanding of Quranic Arabic?',
    type: 'radio',
    options: ['Fluent', 'Good', 'Basic', 'Very limited', 'None']
  },
  {
    id: 'difficultyUnderstanding',
    title: 'Have you ever found it difficult to understand the meaning of what you\'re reciting in prayer?',
    type: 'radio',
    options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'importanceOfUnderstanding',
    title: 'How important is it for you to better understand Quran during prayer?',
    type: 'radio',
    options: ['Extremely important', 'Very important', 'Moderately important', 'Slightly important', 'Not important']
  },
  {
    id: 'biggestStruggle',
    title: 'What\'s your biggest struggle with Islamic learning?',
    type: 'radio',
    options: [
      'Understanding Arabic',
      'Finding time to study',
      'Lack of good resources',
      'Staying consistent',
      'Finding qualified teachers',
      'Connecting theory to practice',
      'Other'
    ]
  },
  {
    id: 'arInterest',
    title: 'Would you be interested in using an AR (Augmented Reality) headset that are designed like normal glasses if it enhances your prayer and Islamic learning experience during prayer?',
    type: 'radio',
    options: ['Very interested', 'Somewhat interested', 'Neutral', 'Not very interested', 'Not interested at all']
  },
  {
    id: 'valuableFeatures',
    title: 'Which features would be most valuable to you in an AR Islamic tool? (Choose up to 3)',
    type: 'checkbox',
    maxSelections: 3,
    options: [
      'Live Quran translation during prayer',
      'Arabic pronunciation guidance',
      'Prayer direction (Qibla) indicator',
      'Islamic calendar and prayer times',
      'Hadith and Islamic knowledge overlay',
      'Tajweed correction',
      'Islamic history visualization',
      'Community prayer features'
    ]
  },
  {
    id: 'barriers',
    title: 'What would stop you from using an AR headset for religious purposes? (Choose all that apply)',
    type: 'checkbox',
    options: [
      'Cost concerns',
      'Technology complexity',
      'Religious/spiritual concerns',
      'Privacy concerns',
      'Comfort/wearability',
      'Battery life',
      'Social acceptance',
      'Nothing would stop me'
    ]
  },
  {
    id: 'paymentWillingness',
    title: 'Would you pay for this kind of AR headset if it genuinely helped your connection to the Quran?',
    type: 'radio',
    options: ['Definitely yes', 'Probably yes', 'Maybe', 'Probably no', 'Definitely no']
  },
  {
    id: 'budgetRange',
    title: 'When it comes to your budget for an Augmented Reality Qur\'an service, which price do you have in mind?',
    type: 'radio',
    options: ['Under $100', '$100-$300', '$300-$500', '$500-$1000', '$1000-$2000', 'Over $2000']
  },
  {
    id: 'likelihood',
    title: '(Optional) If this product were available in the next 12 months, how likely would you be to try it?',
    type: 'radio',
    optional: true,
    options: ['Extremely likely', 'Very likely', 'Moderately likely', 'Slightly likely', 'Not likely at all']
  },
  {
    id: 'additionalFeedback',
    title: '(Optional) Is there anything else that would make this more useful or appealing to you?',
    type: 'textarea',
    optional: true,
    placeholder: 'Share your thoughts...'
  },
  {
    id: 'interviewWillingness',
    title: 'Would you be willing to be contacted to partake in a more detailed interview to understand your specific requirements?',
    type: 'radio',
    options: ['Yes, I\'d be happy to help', 'Maybe, depending on timing', 'No, thank you']
  },
  {
    id: 'investorPresentationInterest',
    title: 'Would you like to see the Angel investor presentation for this business?',
    type: 'radio',
    options: ['Yes, I\'m interested', 'Maybe later', 'No, thank you']
  }
];

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    profession: '',
    age: '',
    prayerFrequency: '',
    arabicUnderstanding: '',
    difficultyUnderstanding: '',
    importanceOfUnderstanding: '',
    biggestStruggle: '',
    arInterest: '',
    valuableFeatures: [],
    barriers: [],
    paymentWillingness: '',
    budgetRange: '',
    likelihood: '',
    additionalFeedback: '',
    interviewWillingness: '',
    investorPresentationInterest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.profession.trim()) {
      newErrors.profession = 'Please tell us what you do';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCurrentQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.optional) return true;

    const value = formData[currentQuestion.id as keyof FormData];
    
    if (currentQuestion.type === 'checkbox') {
      return Array.isArray(value) && value.length > 0;
    }
    
    return value && value.toString().trim() !== '';
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleNextQuestion = () => {
    if (!validateCurrentQuestion()) {
      setErrors({ [questions[currentQuestionIndex].id]: 'This field is required' });
      return;
    }

    setErrors({});
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setCurrentStep(1);
    }
  };

  const saveToDatabase = async (data: FormData) => {
    try {
      const response = await fetch('/.netlify/functions/db-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          profession: data.profession,
          age: data.age,
          prayerFrequency: data.prayerFrequency,
          arabicUnderstanding: data.arabicUnderstanding,
          difficultyUnderstanding: data.difficultyUnderstanding,
          importanceOfUnderstanding: data.importanceOfUnderstanding,
          biggestStruggle: data.biggestStruggle,
          arInterest: data.arInterest,
          valuableFeatures: data.valuableFeatures,
          barriers: data.barriers,
          paymentWillingness: data.paymentWillingness,
          budgetRange: data.budgetRange,
          likelihood: data.likelihood,
          additionalFeedback: data.additionalFeedback,
          interviewWillingness: data.interviewWillingness,
          investorPresentationInterest: data.investorPresentationInterest
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, data: result };
      } else {
        const error = await response.json();
        if (response.status === 409 && error.code === 'DUPLICATE_EMAIL') {
          return { success: false, error: error.details, code: 'DUPLICATE_EMAIL' };
        }
        return { success: false, error: error.details || error.error || 'Database save failed' };
      }
    } catch (error) {
      console.error('Error saving to database:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setEmailStatus('sending');
    
    try {
      // Save to Neon database via API
      const dbResult = await saveToDatabase(formData);
      
      if (!dbResult.success) {
        console.error('Database save failed:', dbResult.error);
        if (dbResult.code === 'DUPLICATE_EMAIL') {
          setEmailStatus('error');
          alert('❌ This email is already on our waitlist!');
          setIsSubmitting(false);
          return;
        } else {
          // Continue with email even if database fails
          console.warn('Database save failed but continuing with email...');
        }
      } else {
        console.log('✅ Successfully saved to Neon database:', dbResult.data);
      }

      // Prepare data for EmailJS
      const waitlistData: WaitlistData = {
        name: formData.name,
        email: formData.email,
        profession: formData.profession,
        age: formData.age,
        prayerFrequency: formData.prayerFrequency,
        arabicUnderstanding: formData.arabicUnderstanding,
        difficultyUnderstanding: formData.difficultyUnderstanding,
        importanceOfUnderstanding: formData.importanceOfUnderstanding,
        biggestStruggle: formData.biggestStruggle,
        arInterest: formData.arInterest,
        valuableFeatures: formData.valuableFeatures,
        barriers: formData.barriers,
        paymentWillingness: formData.paymentWillingness,
        budgetRange: formData.budgetRange,
        likelihood: formData.likelihood,
        additionalFeedback: formData.additionalFeedback,
        interviewWillingness: formData.interviewWillingness,
        investorPresentationInterest: formData.investorPresentationInterest
      };

      // Send notification email to you
      const notificationSent = await sendWaitlistNotification(waitlistData);
      
      // Send confirmation email to user
      const confirmationSent = await sendConfirmationEmail(formData.email, formData.name);

      if (notificationSent || dbResult.success) {
        setEmailStatus('success');
        setCurrentStep(3);
      } else {
        setEmailStatus('error');
        // Still proceed to success page even if email fails
        setTimeout(() => {
          setCurrentStep(3);
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setEmailStatus('error');
      // Still proceed to success page
      setTimeout(() => {
        setCurrentStep(3);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMultipleChoice = (field: 'valuableFeatures' | 'barriers', value: string) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const handleClose = () => {
    setFormData({
      name: '', email: '', profession: '', age: '', prayerFrequency: '',
      arabicUnderstanding: '', difficultyUnderstanding: '', importanceOfUnderstanding: '',
      biggestStruggle: '', arInterest: '', valuableFeatures: [], barriers: [],
      paymentWillingness: '', budgetRange: '', likelihood: '', additionalFeedback: '',
      interviewWillingness: '', investorPresentationInterest: ''
    });
    setCurrentStep(1);
    setCurrentQuestionIndex(0);
    setErrors({});
    setEmailStatus('idle');
    onClose();
  };

  const getProgressPercentage = () => {
    if (currentStep === 1) return 10;
    if (currentStep === 3) return 100;
    return 10 + ((currentQuestionIndex + 1) / questions.length) * 80;
  };

  if (!isOpen) return null;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Progress Bar */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              {currentStep === 1 ? 'Basic Information' : 
               currentStep === 2 ? `Question ${currentQuestionIndex + 1} of ${questions.length}` : 
               'Complete'}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(getProgressPercentage())}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <>
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Join the Waitlist</h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-gray-600 mt-2">Be among the first to experience AR Rahman</p>
            </div>

            <form onSubmit={handleStep1Submit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-2" />
                  What do you do? *
                </label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.profession ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Teacher, Engineer, Student, Imam..."
                />
                {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          </>
        )}

        {/* Step 2: Individual Questions */}
        {currentStep === 2 && currentQuestion && (
          <>
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Help Us Understand You Better</h2>
                  <p className="text-gray-600 mt-1">Question {currentQuestionIndex + 1} of {questions.length}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
                {currentQuestion.title}
              </h3>

              {currentQuestion.type === 'radio' && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 transition-colors">
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={formData[currentQuestion.id as keyof FormData] === option}
                        onChange={(e) => handleInputChange(currentQuestion.id as keyof FormData, e.target.value)}
                        className="w-5 h-5 text-purple-600"
                      />
                      <span className="text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'checkbox' && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option) => {
                    const currentValues = formData[currentQuestion.id as keyof FormData] as string[];
                    const isSelected = currentValues.includes(option);
                    const isDisabled = currentQuestion.maxSelections && 
                                     currentValues.length >= currentQuestion.maxSelections && 
                                     !isSelected;
                    
                    return (
                      <label key={option} className={`flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 transition-colors ${
                        isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleMultipleChoice(currentQuestion.id as 'valuableFeatures' | 'barriers', option)}
                          disabled={isDisabled}
                          className="w-5 h-5 text-purple-600 rounded"
                        />
                        <span className="text-gray-700 font-medium">{option}</span>
                      </label>
                    );
                  })}
                  {currentQuestion.maxSelections && (
                    <p className="text-sm text-gray-500 mt-2">
                      Select up to {currentQuestion.maxSelections} options
                    </p>
                  )}
                </div>
              )}

              {currentQuestion.type === 'textarea' && (
                <textarea
                  value={formData[currentQuestion.id as keyof FormData] as string}
                  onChange={(e) => handleInputChange(currentQuestion.id as keyof FormData, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                  rows={6}
                  placeholder={currentQuestion.placeholder}
                />
              )}

              {errors[currentQuestion.id] && (
                <p className="text-red-500 text-sm mt-4">{errors[currentQuestion.id]}</p>
              )}
            </div>

            <div className="flex justify-between items-center p-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handlePrevQuestion}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              
              <button
                onClick={handleNextQuestion}
                disabled={isSubmitting}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>
                      {emailStatus === 'sending' ? 'Sending...' : 'Submitting...'}
                    </span>
                  </>
                ) : (
                  <>
                    <span>{currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {/* Step 3: Congratulations */}
        {currentStep === 3 && (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-8">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Congratulations, you've successfully joined the waitlist!
            </h2>
            
            <div className="max-w-2xl mx-auto text-gray-600 leading-relaxed space-y-4 mb-8">
              <p>
                We truly appreciate you taking the time to share your insights. We're pleased to confirm that you are now on our waitlist!
              </p>
              
              {emailStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium">
                    ✅ Notification sent successfully! You should receive a confirmation email shortly.
                  </p>
                </div>
              )}
              
              {emailStatus === 'error' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 font-medium">
                    ⚠️ Your registration was successful, but there was an issue sending the notification email. Don't worry - you're still on the waitlist!
                  </p>
                </div>
              )}
              
              <p>
                Over the coming weeks, we'll be rolling out more information and updates about AR Rahman. You'll be among the first to know.
              </p>
              
              <p>
                In the meantime, please stay tuned and keep an eye on your inbox for exclusive content and announcements.
              </p>
              
              <p className="font-medium text-gray-800">
                We're excited to have you on board and look forward to embarking on this journey together!
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You'll receive a confirmation email shortly</li>
                <li>• We'll send you exclusive updates as we develop the product</li>
                <li>• You'll get priority access when we launch</li>
                <li>• We may reach out for feedback during development</li>
              </ul>
            </div>
            
            <button
              onClick={handleClose}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};