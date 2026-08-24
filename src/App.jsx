import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import JoinFormModal from './components/JoinFormModal';
import Footer from './components/Footer';

export default function App() {
  const [joinFormOpen, setJoinFormOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState('');

  const openJoinForm = (membership = '') => {
    setSelectedMembership(membership);
    setJoinFormOpen(true);
  };

  const closeJoinForm = () => {
    setJoinFormOpen(false);
    setSelectedMembership('');
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="app-wrapper">
        <Navbar onOpenJoinForm={() => openJoinForm()} />
        <main>
          <Hero />
          <About />
          <Services />
          <Pricing onOpenJoinForm={openJoinForm} />
          <Gallery />
          <HowItWorks />
          <Contact />
        </main>
        <Footer />
      </div>
      <JoinFormModal
        isOpen={joinFormOpen}
        initialMembership={selectedMembership}
        onClose={closeJoinForm}
      />
    </div>
  );
}
