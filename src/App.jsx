import { useState, useEffect } from 'react';
import { applyTheme } from './utils/theme';
import { getSection } from './utils/dataManager';
import defaultData from './data/forgewellData.json';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import Customizer from './components/Customizer';

export default function App() {
  const [activeCustomizer, setActiveCustomizer] = useState(null);

  // Apply saved theme on mount
  useEffect(() => {
    const savedTheme = getSection('theme', defaultData.theme);
    applyTheme(savedTheme);
  }, []);

  const openCustomizer = (sectionKey) => {
    setActiveCustomizer(sectionKey);
  };

  const closeCustomizer = () => {
    setActiveCustomizer(null);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* 
        App Wrapper: Shrinks on desktop when Customizer is open so the drawer 
        does not overlap site content!
      */}
      <div className={`app-wrapper ${activeCustomizer ? 'customizer-open' : ''}`}>
        <Navbar onOpenCustomizer={openCustomizer} />
        <main>
          <Hero onOpenCustomizer={openCustomizer} />
          <About onOpenCustomizer={openCustomizer} />
          <Services onOpenCustomizer={openCustomizer} />
          <Pricing onOpenCustomizer={openCustomizer} />
          <Gallery onOpenCustomizer={openCustomizer} />
          <HowItWorks onOpenCustomizer={openCustomizer} />
        </main>
        <Footer />
      </div>

      {/* Global Customizer Panel */}
      <Customizer
        sectionKey={activeCustomizer}
        isOpen={!!activeCustomizer}
        onClose={closeCustomizer}
      />
    </div>
  );
}
