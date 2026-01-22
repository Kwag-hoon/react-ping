import React from 'react';
import HeroSection from './HeroSection';
import FeedbackExplorer from './FeedbackExplorer';
import RecentArchivesSection from './RecentArchivesSection';
import FeedbackAchive from './FeedbackAchive';
import '../styles/main.css';

function Main(props) {
  return (
    <main>
      <HeroSection />
      <FeedbackExplorer />
      <RecentArchivesSection />
      <FeedbackAchive />
    </main>
  );
}

export default Main;