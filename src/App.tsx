import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { WhyThisMatters } from './components/WhyThisMatters';
import { PresenceInSalah } from './components/PresenceInSalah';
import { JoinInnerCircle } from './components/JoinInnerCircle';
import { WaitlistForm } from './components/WaitlistForm';
import { ComingSoon } from './pages/ComingSoon';
// Import test utility for development
import './utils/emailTest';

function LandingPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleJoinWaitlist = () => {
    setIsWaitlistOpen(true);
  };

  const handleCloseWaitlist = () => {
    setIsWaitlistOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Hero onJoinWaitlist={handleJoinWaitlist} />
      <WhyThisMatters />
      <PresenceInSalah />
      <JoinInnerCircle onJoinWaitlist={handleJoinWaitlist} />
      <WaitlistForm isOpen={isWaitlistOpen} onClose={handleCloseWaitlist} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<ComingSoon />} />
      </Routes>
    </Router>
  );
}

export default App;