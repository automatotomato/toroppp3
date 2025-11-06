import Hero from './components/Hero';
import About from './components/About';
import Partnership from './components/Partnership';
import EventDetails from './components/EventDetails';
import RegistrationForm from './components/RegistrationForm';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Partnership />
      <EventDetails />
      <RegistrationForm />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
}

export default App;
