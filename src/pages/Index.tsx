import React, { useState } from 'react';
import HealthDashboard from '@/components/HealthDashboard';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <HealthDashboard 
      selectedLanguage={selectedLanguage}
      onLanguageChange={setSelectedLanguage}
    />
  );
};

export default Index;
